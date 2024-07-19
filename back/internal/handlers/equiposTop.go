package handlers

import (
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
