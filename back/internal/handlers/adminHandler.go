package handlers

import (
	"back/internal/models"
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"sort"
	"strconv"

	"github.com/gorilla/mux"
)

func SavePermissionsByRole(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("guardado de  permisos por rol")

		var relRolPermisos models.RelRolPermiso
		err := json.NewDecoder(r.Body).Decode(&relRolPermisos)
		if err != nil {
			http.Error(w, "Invalid request payload", http.StatusBadRequest)
			return
		}
		log.Println(relRolPermisos)
		adminRepo := repositories.NewAdminRepository(db)
		err = adminRepo.SavePermissionsByRole(relRolPermisos.Rol, relRolPermisos.Permisos)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message": "Permisos guardados correctamente",
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

func GetAllPermissions(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		adminRepo := repositories.NewAdminRepository(db)
		permisos, err := adminRepo.GetAllPermissions()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(permisos, func(i, j int) bool {
			return permisos[i].Nombre < permisos[j].Nombre
		})
		json.NewEncoder(w).Encode(permisos)
	}
}

func GetAllPermissionsByRole(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		//obteniendo el id a eliminar
		idStr := vars["rolId"]
		// Convertir el id a entero
		rolId, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "ID inválido", http.StatusBadRequest)
			return
		}
		adminRepo := repositories.NewAdminRepository(db)
		permisos, err := adminRepo.GetAllPermissionsByRole(rolId)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(permisos, func(i, j int) bool {
			return permisos[i].Nombre < permisos[j].Nombre
		})
		json.NewEncoder(w).Encode(permisos)
	}
}

func GetAllPermissionsByRoleName(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		//obteniendo el id a eliminar
		idStr := vars["rol"]
		adminRepo := repositories.NewAdminRepository(db)
		permisos, err := adminRepo.GetAllPermissionsByRoleName(idStr)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(permisos, func(i, j int) bool {
			return permisos[i].Nombre < permisos[j].Nombre
		})
		json.NewEncoder(w).Encode(permisos)
	}
}

func GetAllRoles(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		adminRepo := repositories.NewAdminRepository(db)
		roles, err := adminRepo.GetAllRoles()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(roles, func(i, j int) bool {
			return roles[i].Nombre < roles[j].Nombre
		})
		json.NewEncoder(w).Encode(roles)
	}
}
