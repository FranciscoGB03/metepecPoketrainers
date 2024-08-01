package handlers

import (
	"back/internal/models"
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
)

func GetEquiposTop(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		equiposTopRepo := repositories.NewEquiposTopRepository(db)
		equiposTop, err := equiposTopRepo.GetAllEquiposTop()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(equiposTop, func(i, j int) bool {
			return equiposTop[i].Posicion < equiposTop[j].Posicion
		})
		json.NewEncoder(w).Encode(equiposTop)
	}
}

func AddTopTeam(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		equiposTopRepo := repositories.NewEquiposTopRepository(db)
		var equipoTop models.EquipoTop
		err := json.NewDecoder(r.Body).Decode(&equipoTop)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		equipo, err := equiposTopRepo.CreateTopTeam(equipoTop)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		json.NewEncoder(w).Encode(equipo)
	}
}
