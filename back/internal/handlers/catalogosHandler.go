package handlers

import (
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
)

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
