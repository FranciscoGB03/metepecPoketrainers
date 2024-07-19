package routes

import (
	"back/internal/handlers"
	"database/sql"

	"github.com/gorilla/mux"
)

// SetupRouter configures the routes and returns a router
func SetupRouter(db *sql.DB, jwtKey []byte) *mux.Router {
	// Crear el enrutador
	router := mux.NewRouter()

	// Authentication routes
	router.HandleFunc("/register", handlers.Register(db, jwtKey)).Methods("POST")
	router.HandleFunc("/login", handlers.Login(db, jwtKey)).Methods("POST")

	// Create a subrouter for protected routes
	protected := router.PathPrefix("/").Subrouter()
	protected.Use(handlers.Authenticate(jwtKey))

	// Create a subrouter for protected POST routes
	protectedPost := protected.Methods("POST").Subrouter()
	protectedPut := protected.Methods("PUT").Subrouter()
	protectedDelete := protected.Methods("DELETE").Subrouter()

	// Catalogos
	// obtención de ataques rápidos
	router.HandleFunc("/getAtaquesRapidos", handlers.GetAtaquesRapidos(db)).Methods("GET")
	// obtención de ataques cargados
	router.HandleFunc("/getAtaquesCargados", handlers.GetAtaquesCargados(db)).Methods("GET")
	// obtención de los pokemon
	router.HandleFunc("/getPokemons", handlers.GetPokemons(db)).Methods("GET")
	// obtencion de catalogos liga y equipos insignia
	router.HandleFunc("/getCatalogosLigaEquipos", handlers.GetCatalogosLigaEquipos(db)).Methods("GET")
	// obtener todos los jugadores top
	router.HandleFunc("/getTopMundial", handlers.GetTopMundial(db)).Methods("GET")
	// guardar un jugador top
	protectedPost.HandleFunc("/guardarJugador", handlers.PostSaveJugadorTop(db)).Methods("POST")
	// actualizar informacion de un jugador
	protectedPut.HandleFunc("/updateJugadorTop", handlers.PutJugadorTop(db)).Methods("PUT")
	// Metodo para eliminar jugadores top
	protectedDelete.HandleFunc("/eliminarJugadorTop/{id}", handlers.DeteleJugadorTop(db)).Methods("DELETE")
	// Metodo para eliminar todos los jugadores top
	protectedPost.HandleFunc("/eliminarAlljugadoresTop", handlers.DeteleAllJugadoresTop(db)).Methods("POST")

	// Metodo para obtener todos los competidores de la liga local
	router.HandleFunc("/getLigaLocal", handlers.GetLigaLocal(db)).Methods("GET")
	// Registrar competidor sin equipo
	protectedPost.HandleFunc("/registrarCompetidor", handlers.RegistrarCompetidor(db)).Methods("POST")
	// Actualizacion de competidor de liga local
	protectedPut.HandleFunc("/actualizarCompetidor", handlers.ActualizarCompetidor(db)).Methods("PUT")
	// Eliminar competidor contodo y pokemon registrados
	protectedDelete.HandleFunc("/eliminarCompetidor/{id}", handlers.EliminarCompetidor(db)).Methods("DELETE")
	// Registro de equipo de competidores
	protectedPost.HandleFunc("/registrarEquipo", handlers.RegistrarEquipo(db)).Methods("POST")
	// Eliminar pokemon de equipo competidores
	protectedDelete.HandleFunc("/eliminarPokemon/{id}", handlers.EliminarPokemon(db)).Methods("DELETE")

	// Rutas para equipos Top
	// ruta para obtencion de los equipos top de tipo GET
	router.HandleFunc("/getEquiposTop", handlers.GetEquiposTop(db)).Methods("GET")

	return router
}
