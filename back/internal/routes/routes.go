package routes

import (
	"back/internal/handlers"
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

// SetupRouter configures the routes and returns a router
func SetupRouter(db *sql.DB) *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/getPrueba", handlers.HelloWorldHandler).Methods("GET")
	//obtener todos los jugadores top
	router.HandleFunc("/getTopMundial", handlers.GetTopMundial(db)).Methods("GET")
	// Agregar middleware CORS
	router.Use(enableCORS)
	return router
}

// Middleware para habilitar CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
