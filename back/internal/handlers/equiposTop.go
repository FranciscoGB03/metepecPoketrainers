package handlers

import (
	"back/internal/models"
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
	"strconv"

	"github.com/gorilla/mux"
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

func DeleteTopTeam(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		//obteniendo el id a eliminar
		idStr := vars["id"]
		// Convertir el id a entero
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "ID inválido", http.StatusBadRequest)
			return
		}
		equiposTopRepo := repositories.NewEquiposTopRepository(db)
		result, err := equiposTopRepo.DeleteTopTeam(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Error al obtener las filas afectadas", http.StatusInternalServerError)
			return
		}

		if rowsAffected == 0 {
			http.Error(w, "No se encontró el registro", http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message":      "Registro eliminado correctamente",
			"rowsAffected": rowsAffected,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
