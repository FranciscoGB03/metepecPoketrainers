package handlers

import (
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
	"sort"
)

func GetPokemons(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		pokeRepo := repositories.NewPokemonRepository(db)

		pokemones, err := pokeRepo.GetPokemons()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		sort.Slice(pokemones, func(i, j int) bool {
			return pokemones[i].Nombre < pokemones[j].Nombre
		})
		json.NewEncoder(w).Encode(pokemones)
	}
}
