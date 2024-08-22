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

func DeleteRol(db *sql.DB) http.HandlerFunc {
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
		catalogoRepo := repositories.NewCatalogosRepository(db)
		result, err := catalogoRepo.DeleteRol(id)
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

func SaveRol(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogoRepo := repositories.NewCatalogosRepository(db)
		var rol models.Rol
		err := json.NewDecoder(r.Body).Decode(&rol)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		registro, err := catalogoRepo.SaveRol(rol)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(registro)
	}
}

func GetCatalogosLigaEquipos(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogoRepo := repositories.NewCatalogosRepository(db)

		catalogos, err := catalogoRepo.GetLigasEquipos()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(catalogos.EquipoInsignia, func(i, j int) bool {
			return catalogos.EquipoInsignia[i].ID < catalogos.EquipoInsignia[j].ID
		})
		sort.Slice(catalogos.Liga, func(i, j int) bool {
			return catalogos.Liga[i].ID < catalogos.Liga[j].ID
		})
		json.NewEncoder(w).Encode(catalogos)
	}
}

func GetAtaquesRapidos(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogoRepo := repositories.NewCatalogosRepository(db)
		ataquesRapidos, err := catalogoRepo.GetAtaquesRapidos()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(ataquesRapidos, func(i, j int) bool {
			return ataquesRapidos[i].NombreLa < ataquesRapidos[j].NombreLa
		})
		json.NewEncoder(w).Encode(ataquesRapidos)
	}
}

func GetAtaquesCargados(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogoRepo := repositories.NewCatalogosRepository(db)
		ataquesCargados, err := catalogoRepo.GetAtaquesCargados()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(ataquesCargados, func(i, j int) bool {
			return ataquesCargados[i].NombreLa < ataquesCargados[j].NombreLa
		})
		json.NewEncoder(w).Encode(ataquesCargados)
	}
}
