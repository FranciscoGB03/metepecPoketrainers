package repositories

import (
	"back/internal/models"
	"database/sql"
)

type JugadorRepository struct {
	db *sql.DB
}

func NewJugadorRepository(db *sql.DB) *JugadorRepository {
	return &JugadorRepository{db}
}

func (r *JugadorRepository) GetJugadores() ([]models.Jugador, error) {
	var jugadores []models.Jugador

	rows, err := r.db.Query("SELECT id, nombre_jugador, equipo_insignia, puntos_totales FROM top_mundial")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var jugador models.Jugador
		if err := rows.Scan(&jugador.ID, &jugador.NombreJugador, &jugador.EquipoInsignia, &jugador.PuntosTotales); err != nil {
			return nil, err
		}
		jugadores = append(jugadores, jugador)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return jugadores, nil
}
