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

func GetLigaLocal(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		competidorRepo := repositories.NewCompetidorRepository(db)
		// consulta a todos los competidores de la liga local
		competidores, err := competidorRepo.GetCompetidores()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(competidores, func(i, j int) bool {
			return competidores[i].ID < competidores[j].ID
		})
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

func ActualizarCompetidor(db *sql.DB) http.HandlerFunc {
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
		result, err := competidorRepo.ActualizarCompetidor(competidorRes)
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
			http.Error(w, "No se encontraron cambios en el registro", http.StatusAccepted)
			return
		}

		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message":      "Registro actualizado correctamente",
			"rowsAffected": rowsAffected,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func EliminarCompetidor(db *sql.DB) http.HandlerFunc {
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
		competidorRepo := repositories.NewCompetidorRepository(db)
		err = competidorRepo.DeleteCompetidor(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message": "Registro eliminado correctamente",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func EliminarPokemon(db *sql.DB) http.HandlerFunc {
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
		competidorRepo := repositories.NewCompetidorRepository(db)
		err = competidorRepo.DeletePokemon(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message": "Registro eliminado correctamente",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
