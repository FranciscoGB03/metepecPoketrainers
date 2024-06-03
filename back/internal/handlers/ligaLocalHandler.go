package handlers

import (
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
