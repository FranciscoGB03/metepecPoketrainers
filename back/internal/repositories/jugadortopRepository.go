package repositories

import (
	"back/internal/models"
	"database/sql"
)

type JugadorTopRepository struct {
	db *sql.DB
}

func NewJugadorRepository(db *sql.DB) *JugadorTopRepository {
	return &JugadorTopRepository{db}
}

func (r *JugadorTopRepository) GetJugadores() ([]models.JugadorTop, error) {
	var jugadores []models.JugadorTop

	rows, err := r.db.Query("SELECT id, nombre_jugador, equipo_insignia, puntos_totales FROM top_mundial")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var jugador models.JugadorTop
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

func (r *JugadorTopRepository) SaveJugadorTop(jugador models.JugadorTop) (models.JugadorTop, error) {

	query := "INSERT INTO top_mundial (nombre_jugador, equipo_insignia, puntos_totales) VALUES (?, ?, ?)"
	result, err := r.db.Exec(query, jugador.NombreJugador, jugador.EquipoInsignia, jugador.PuntosTotales)
	if err != nil {
		return models.JugadorTop{}, err
	}

	// Obtener el ID del último insertado si es necesario
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return models.JugadorTop{}, err
	}
	jugador.ID = int(lastInsertID)

	return jugador, nil
}
