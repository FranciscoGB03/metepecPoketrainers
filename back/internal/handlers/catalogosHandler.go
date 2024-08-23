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

func UpdatePermission(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// objeto para mapear la informacion entrante
		var permiso models.Permiso

		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&permiso)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// llamada al repositorio
		catalogoRepo := repositories.NewCatalogosRepository(db)

		result, err := catalogoRepo.UpdatePermission(permiso)
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

func DeletePermission(db *sql.DB) http.HandlerFunc {
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
		result, err := catalogoRepo.DeletePermission(id)
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

func SavePermission(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogoRepo := repositories.NewCatalogosRepository(db)
		var permiso models.Permiso
		err := json.NewDecoder(r.Body).Decode(&permiso)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		registro, err := catalogoRepo.SavePermission(permiso)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(registro)
	}
}

func UpdateRol(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// objeto para mapear la informacion entrante
		var rol models.Rol

		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&rol)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// llamada al repositorio
		catalogoRepo := repositories.NewCatalogosRepository(db)

		result, err := catalogoRepo.UpdateRol(rol)
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
