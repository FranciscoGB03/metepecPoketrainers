package handlers

import (
	"back/internal/models"
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetLigaLocal(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		competidorRepo := repositories.NewCompetidorRepository(db)
		// consulta a todos los competidores de la liga local
		competidores, err := competidorRepo.GetCompetidores()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(competidores)
	}

}

func RegistrarEquipo(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// objeto para mapear la informacion entrante
		var equipo []models.EquipoCompetidor

		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&equipo)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		competidorRepo := repositories.NewCompetidorRepository(db)
		// consulta a todos los competidores de la liga local
		pokes, err := competidorRepo.RegistroEquipo(equipo)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(pokes)
	}
}

func RegistrarCompetidor(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// info del competidor para mapear la info entrante
		var competidorRes models.Competidor
		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&competidorRes)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		competidorRepo := repositories.NewCompetidorRepository(db)
		// consulta a todos los competidores de la liga local
		competidor, err := competidorRepo.RegistroCompetidor(competidorRes)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(competidor)
	}
}
