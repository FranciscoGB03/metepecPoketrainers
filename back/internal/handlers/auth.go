package handlers

import (
	"back/internal/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

func Register(db *sql.DB, jwtKey []byte) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var creds models.Credentials
		err := json.NewDecoder(r.Body).Decode(&creds)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Error hashing password", http.StatusInternalServerError)
			return
		}

		_, err = db.Exec("INSERT INTO users (email, password) VALUES (?, ?)", creds.Email, hashedPassword)
		if err != nil {
			http.Error(w, "Error saving user to database", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}

func Login(db *sql.DB, jwtKey []byte) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var creds models.Credentials
		err := json.NewDecoder(r.Body).Decode(&creds)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}

		var storedCreds models.Credentials
		var userID int
		var rol string
		err = db.QueryRow("SELECT u.id, u.email, u.password, r.nombre  FROM users u JOIN rol r ON r.id=u.rol_id WHERE email = ?", creds.Email).Scan(&userID, &storedCreds.Email, &storedCreds.Password, &rol)
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(storedCreds.Password), []byte(creds.Password))
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}

		// Fetch user permissions
		rows, err := db.Query(`
            SELECT p.nombre FROM permisos p
            JOIN rel_rol_permisos rrp ON p.id = rrp.permiso_id
            JOIN rol r ON rrp.rol_id = r.id
            JOIN users u ON r.id = u.rol_id
            WHERE u.id = ?
        `, userID)
		if err != nil {
			http.Error(w, "Error fetching permissions", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var permissions []string
		for rows.Next() {
			var permiso string
			if err := rows.Scan(&permiso); err != nil {
				http.Error(w, "Error scanning permissions", http.StatusInternalServerError)
				return
			}
			permissions = append(permissions, permiso)
		}

		expirationTime := time.Now().Add(5 * time.Minute)
		claims := &models.Claims{
			Email: creds.Email,
			Rol:   rol,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: expirationTime.Unix(),
			},
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString(jwtKey)
		if err != nil {
			http.Error(w, "Error creating token", http.StatusInternalServerError)
			return
		}

		http.SetCookie(w, &http.Cookie{
			Name:    "token",
			Value:   tokenString,
			Expires: expirationTime,
		})

		// Return token and permissions in response
		response := struct {
			Token       string   `json:"token"`
			Permissions []string `json:"permissions"`
		}{
			Token:       tokenString,
			Permissions: permissions,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func Authenticate(jwtKey []byte, db *sql.DB) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			c, err := r.Cookie("token")
			if err != nil {
				if err == http.ErrNoCookie {
					http.Error(w, "Unauthorized", http.StatusUnauthorized)
					return
				}
				http.Error(w, "Bad Request", http.StatusBadRequest)
				return
			}

			tknStr := c.Value
			claims := &models.Claims{}

			tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
				return jwtKey, nil
			})
			if err != nil {
				if err == jwt.ErrSignatureInvalid {
					http.Error(w, "Unauthorized", http.StatusUnauthorized)
					return
				}
				http.Error(w, "Bad Request", http.StatusBadRequest)
				return
			}
			if !tkn.Valid {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}

			var userID int
			err = db.QueryRow("SELECT id FROM users WHERE email = ?", claims.Email).Scan(&userID)
			if err != nil {
				http.Error(w, "User not found", http.StatusInternalServerError)
				return
			}

			// Fetch user permissions
			rows, err := db.Query(`
                SELECT p.nombre FROM permisos p
                JOIN rel_rol_permisos rrp ON p.id = rrp.permiso_id
                JOIN rol r ON rrp.rol_id = r.id
                JOIN users u ON r.id = u.rol_id
                WHERE u.id = ?
            `, userID)
			if err != nil {
				http.Error(w, "Error fetching permissions", http.StatusInternalServerError)
				return
			}
			defer rows.Close()

			var permissions []string
			for rows.Next() {
				var permiso string
				if err := rows.Scan(&permiso); err != nil {
					http.Error(w, "Error scanning permissions", http.StatusInternalServerError)
					return
				}
				permissions = append(permissions, permiso)
			}

			// Store permissions in context (or use headers for simplicity)
			r.Header.Set("Permissions", strings.Join(permissions, ","))

			next.ServeHTTP(w, r)
		})
	}
}
