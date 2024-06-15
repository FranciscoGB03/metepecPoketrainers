package handlers

import (
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetCatalogosLigaEquipos(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		catalogoRepo := repositories.NewCatalogosRepository(db)

		jugadores, err := catalogoRepo.GetLigasEquipos()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(jugadores)
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
		json.NewEncoder(w).Encode(ataquesCargados)
	}
}
