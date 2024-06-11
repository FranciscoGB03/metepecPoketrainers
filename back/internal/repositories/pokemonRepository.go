package repositories

import (
	"back/internal/models"
	"database/sql"
)

type PokemonRepository struct {
	db *sql.DB
}

func NewPokemonRepository(db *sql.DB) *PokemonRepository {
	return &PokemonRepository{db}
}

// Metodo para consultar pokemons
func (r *PokemonRepository) GetPokemons() ([]models.Pokemon, error) {

	var pokemons []models.Pokemon
	// query
	query := `SELECT id, numero_pokedex,nombre,img_url FROM pokemon`
	rows, err := r.db.Query(query)
	if err != nil {
		return pokemons, err
	}
	defer rows.Close()

	for rows.Next() {
		var pokemon models.Pokemon
		if err := rows.Scan(&pokemon.ID, &pokemon.NumeroPokedex, &pokemon.Nombre, &pokemon.ImgUrl); err != nil {
			return pokemons, err
		}
		pokemons = append(pokemons, pokemon)
	}
	if err := rows.Err(); err != nil {
		return pokemons, err
	}
	return pokemons, nil
}
