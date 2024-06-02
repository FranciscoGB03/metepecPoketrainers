package routes

import (
	"back/internal/handlers"
	"database/sql"

	"github.com/gorilla/mux"
)

// SetupRouter configures the routes and returns a router
func SetupRouter(db *sql.DB) *mux.Router {
	// Crear el enrutador
	router := mux.NewRouter()

	// Agregar middleware CORS para todas las rutas
	//router.Use(mux.CORSMethodMiddleware(router))
	//router.Use(enableCORS)
	router.HandleFunc("/getPrueba", handlers.HelloWorldHandler).Methods("GET")
	//obtener todos los jugadores top
	router.HandleFunc("/getTopMundial", handlers.GetTopMundial(db)).Methods("GET")
	//guardar un jugador top
	router.HandleFunc("/guardarJugador", handlers.PostSaveJugadorTop(db)).Methods("POST")
	return router
}
