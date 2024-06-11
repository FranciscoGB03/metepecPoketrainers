package handlers

import (
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
)

func GetPokemons(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		pokeRepo := repositories.NewPokemonRepository(db)

		pokemones, err := pokeRepo.GetPokemons()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(pokemones)
	}
}
