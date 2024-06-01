package handlers

import (
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

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(jugadores)
	}

}
