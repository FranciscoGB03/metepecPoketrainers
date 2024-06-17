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

	// Catalogos
	// obtención de ataques rápidos
	router.HandleFunc("/getAtaquesRapidos", handlers.GetAtaquesRapidos(db)).Methods("GET")
	// obtención de ataques cargados
	router.HandleFunc("/getAtaquesCargados", handlers.GetAtaquesCargados(db)).Methods("GET")
	// obtención de los pokemon
	router.HandleFunc("/getPokemons", handlers.GetPokemons(db)).Methods("GET")
	//obtencion de catalogos liga y equipos insignia
	router.HandleFunc("/getCatalogosLigaEquipos", handlers.GetCatalogosLigaEquipos(db)).Methods("GET")
	//obtener todos los jugadores top
	router.HandleFunc("/getTopMundial", handlers.GetTopMundial(db)).Methods("GET")
	//guardar un jugador top
	router.HandleFunc("/guardarJugador", handlers.PostSaveJugadorTop(db)).Methods("POST")
	// actualizar informacion de un jugador
	router.HandleFunc("/updateJugadorTop", handlers.PutJugadorTop(db)).Methods("PUT")
	// Metodo para eliminar jugadores top
	router.HandleFunc("/eliminarJugadorTop/{id}", handlers.DeteleJugadorTop(db)).Methods("DELETE")
	// Metodo para eliminar todos los jugadores top
	router.HandleFunc("/eliminarAlljugadoresTop", handlers.DeteleAllJugadoresTop(db)).Methods("POST")

	//Metodo para obtener todos los competidores de la liga local
	router.HandleFunc("/getLigaLocal", handlers.GetLigaLocal(db)).Methods("GET")
	//Registro de equipo de competidores
	router.HandleFunc("/registrarEquipo", handlers.RegistrarEquipo(db)).Methods("POST")
	// Registrar competidor sin equipo
	router.HandleFunc("/registrarCompetidor", handlers.RegistrarCompetidor(db)).Methods("POST")
	return router
}
