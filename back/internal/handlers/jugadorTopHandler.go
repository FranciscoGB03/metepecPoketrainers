package handlers

import (
	"back/internal/models"
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
)

// HelloWorldHandler devuelve "Hola, mundo" en el navegador
func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	// Establecer el encabezado Content-Type
	w.Header().Set("Content-Type", "text/plain")

	// Escribir "Hola, mundo" en el cuerpo de la respuesta
	w.Write([]byte("Hola, mundo"))
}

func GetTopMundial(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jugadorRepo := repositories.NewJugadorRepository(db)

		jugadores, err := jugadorRepo.GetJugadores()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(jugadores)
	}

}

func PostSaveJugadorTop(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// objeto para mapear la informacion entrante
		var jugador models.JugadorTop

		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&jugador)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// llamada al repositorio
		jugadorRepo := repositories.NewJugadorRepository(db)

		jugador, err = jugadorRepo.SaveJugadorTop(jugador)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		json.NewEncoder(w).Encode(jugador)
	}
}
