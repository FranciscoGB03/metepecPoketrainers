package repositories

import (
	"back/internal/models"
	"database/sql"
)

type CompetidorRepository struct {
	db *sql.DB
}

func NewCompetidorRepository(db *sql.DB) *CompetidorRepository {
	return &CompetidorRepository{db}
}

func (r *CompetidorRepository) GetCompetidores() ([]models.Competidor, error) {
	query := `
		SELECT c.id, c.nombre, c.equipo_id, c.puntos, 
		       e.id, e.nombre,
		       ec.id, ec.competidor_id, ec.pokemon, ec.ataque_basico, 
		       ec.primer_ataque_cargado, ec.segundo_ataque_cargado, ec.url_pokemon, ec.liga_id
		FROM competidor c
		JOIN equipo_insignia e ON c.equipo_id = e.id
		LEFT JOIN equipo_competidor ec ON c.id = ec.competidor_id
	`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	competidorMap := make(map[int]*models.Competidor)

	for rows.Next() {
		//var competidorID int
		var competidor models.Competidor
		var equipo models.EquipoInsignia
		var equipoCompetidor models.EquipoCompetidor

		err := rows.Scan(
			&competidor.ID,
			&competidor.Nombre,
			&competidor.EquipoID,
			&competidor.Puntos,
			//&competidor.CreatedAt,
			&equipo.ID,
			&equipo.Nombre,
			&equipoCompetidor.ID,
			&equipoCompetidor.CompetidorID,
			&equipoCompetidor.Pokemon,
			&equipoCompetidor.AtaqueBasico,
			&equipoCompetidor.PrimerAtaqueCargado,
			&equipoCompetidor.SegundoAtaqueCargado,
			&equipoCompetidor.URLPokemon,
			&equipoCompetidor.LigaID,
		)
		if err != nil {
			return nil, err
		}

		// Si el competidor ya existe en el mapa, añade el equipoCompetidor a su lista
		if existingCompetidor, ok := competidorMap[competidor.ID]; ok {
			existingCompetidor.EquipoCompetidores = append(existingCompetidor.EquipoCompetidores, equipoCompetidor)
		} else {
			// Si el competidor no existe, añádelo al mapa y añade el equipoCompetidor
			competidor.Equipo = equipo
			competidor.EquipoCompetidores = []models.EquipoCompetidor{equipoCompetidor}
			competidorMap[competidor.ID] = &competidor
		}
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	// Convertir el mapa a una lista
	var competidores []models.Competidor
	for _, competidor := range competidorMap {
		competidores = append(competidores, *competidor)
	}

	return competidores, nil
}
