package handlers

import (
	"back/internal/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
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
		//  verificar que el correo electronico no se  encuentre  registrado
		email, err := db.Query(`SELECT*FROM users where email=?`, creds.Email)
		if err != nil {
			http.Error(w, "Error al intentar conectar con la base de datos", http.StatusInternalServerError)
			return
		}
		defer email.Close()
		if email.Next() {
			http.Error(w, "El correo utilizado ya encuentra registrado, favor de revisar sus datos o cambiar de correo.", http.StatusBadRequest)
			return
		}
		result, err := db.Exec("INSERT INTO users (email, password,rol_id) VALUES (?, ?, 2)", creds.Email, hashedPassword)
		if err != nil {
			http.Error(w, "Error saving user to database", http.StatusInternalServerError)
			return
		}
		uID, err := result.LastInsertId()
		if err != nil {
			http.Error(w, "Error saving user to database", http.StatusInternalServerError)
			return
		}
		var permissions []string
		rol := "user"
		expirationTime := time.Now().Add(5 * time.Minute)
		claims := &models.Claims{
			Email:       creds.Email,
			Rol:         rol,
			UserId:      uID,
			Permissions: permissions,
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

		// Return token and permissions in response
		response := struct {
			Token string `json:"token"`
		}{
			Token: tokenString,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
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
		var userID int64
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
			Email:       creds.Email,
			Rol:         rol,
			UserId:      userID,
			Permissions: permissions,
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
		// Return token and permissions in response
		response := struct {
			Token string `json:"token"`
		}{
			Token: tokenString,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func Authenticate(jwtKey []byte) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Get the token from the header
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" {
				http.Error(w, "No token provided", http.StatusUnauthorized)
				return
			}

			tokenString := strings.TrimPrefix(authHeader, "Bearer ")

			// Parse the token
			token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
				return jwtKey, nil
			})

			if err != nil || !token.Valid {
				http.Error(w, "Invalid token", http.StatusUnauthorized)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
