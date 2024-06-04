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

// Registro del competidor
func (r *CompetidorRepository) RegistroCompetidor(competidor models.Competidor) (models.Competidor, error) {
	query := `INSERT INTO competidor (nombre, equipo_id, puntos) VALUES (?, ?, ?)`
	result, err := r.db.Exec(query, competidor.Nombre, competidor.EquipoID, competidor.Puntos)
	if err != nil {
		return models.Competidor{}, err
	}
	// Obtener el ID del último insertado si es necesario
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return models.Competidor{}, err
	}
	competidor.ID = int(lastInsertID)
	return competidor, nil
}

// Registro de equipos a raiz de usuario registrado
func (r *CompetidorRepository) RegistroEquipo(equipo []models.EquipoCompetidor) ([]models.EquipoCompetidor, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return equipo, err
	}
	//se recorre el arreglo con los pokemon que integran el equipo
	for i, poke := range equipo {
		query := `INSERT INTO equipo_competidor
						(competidor_id, 
						pokemon, 
						ataque_basico, 
						primer_ataque_cargado, 
						segundo_ataque_cargado, 
						url_pokemon, 
						liga_id) 
						VALUES(?, ?, ?, ?, ?, ?, ?)`
		result, err := tx.Exec(query, poke.CompetidorID, poke.Pokemon, poke.AtaqueBasico, poke.PrimerAtaqueCargado, poke.SegundoAtaqueCargado, poke.URLPokemon, poke.LigaID)
		if err != nil {
			tx.Rollback()
			return equipo, err
		}
		id, err := result.LastInsertId()
		if err != nil {
			tx.Rollback()
			return nil, err
		}
		//actualizar el campo del id
		equipo[i].ID = int(id)
	}
	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return nil, err
	}
	return equipo, nil
}

func (r *CompetidorRepository) GetCompetidores() ([]models.Competidor, error) {
	query := `
		SELECT c.id, c.nombre, c.equipo_id, c.puntos, 
		       e.id, e.nombre,
		       ec.id, ec.competidor_id, ec.pokemon, ec.ataque_basico, 
		       ec.primer_ataque_cargado, ec.segundo_ataque_cargado, ec.url_pokemon, ec.liga_id
		FROM competidor c
		LEFT JOIN equipo_insignia e ON c.equipo_id = e.id
		LEFT JOIN equipo_competidor ec ON c.id = ec.competidor_id
	`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	competidores, err := scanCompetidores(rows)
	if err != nil {
		return nil, err
	}

	return competidores, nil
}

func scanCompetidores(rows *sql.Rows) ([]models.Competidor, error) {
	var competidores []models.Competidor
	competidorMap := make(map[int]*models.Competidor)

	for rows.Next() {
		competidor, equipo, equipoCompetidor, err := scanCompetidor(rows)
		if err != nil {
			return nil, err
		}

		if existingCompetidor, ok := competidorMap[competidor.ID]; ok {
			if equipoCompetidor != nil { // Verificar si equipoCompetidor no es nil
				existingCompetidor.EquipoCompetidores = append(existingCompetidor.EquipoCompetidores, *equipoCompetidor)
			}
		} else {
			competidor.Equipo = equipo
			if equipoCompetidor != nil { // Verificar si equipoCompetidor no es nil
				competidor.EquipoCompetidores = []models.EquipoCompetidor{*equipoCompetidor}
			}
			competidorMap[competidor.ID] = competidor
		}
	}

	for _, competidor := range competidorMap {
		competidores = append(competidores, *competidor)
	}

	return competidores, nil
}

func scanCompetidor(rows *sql.Rows) (*models.Competidor, models.EquipoInsignia, *models.EquipoCompetidor, error) {
	var competidor models.Competidor
	var equipo models.EquipoInsignia
	var equipoCompetidor *models.EquipoCompetidor // Usamos un puntero

	var eqID, ecID, compID, ligaID sql.NullInt64
	var eqNombre, pokemon, ataqueBasico, primerAtaqueCargado, segundoAtaqueCargado, urlPokemon sql.NullString

	err := rows.Scan(
		&competidor.ID,
		&competidor.Nombre,
		&competidor.EquipoID,
		&competidor.Puntos,
		&eqID,
		&eqNombre,
		&ecID,
		&compID,
		&pokemon,
		&ataqueBasico,
		&primerAtaqueCargado,
		&segundoAtaqueCargado,
		&urlPokemon,
		&ligaID,
	)
	if err != nil {
		return nil, equipo, equipoCompetidor, err
	}

	if eqID.Valid {
		equipo.ID = int(eqID.Int64)
	}
	if eqNombre.Valid {
		equipo.Nombre = eqNombre.String
	}
	if ecID.Valid && compID.Valid && pokemon.Valid && ataqueBasico.Valid && primerAtaqueCargado.Valid && segundoAtaqueCargado.Valid && urlPokemon.Valid && ligaID.Valid {
		equipoCompetidor = &models.EquipoCompetidor{
			ID:                   int(ecID.Int64),
			CompetidorID:         int(compID.Int64),
			Pokemon:              pokemon.String,
			AtaqueBasico:         ataqueBasico.String,
			PrimerAtaqueCargado:  primerAtaqueCargado.String,
			SegundoAtaqueCargado: segundoAtaqueCargado.String,
			URLPokemon:           urlPokemon.String,
			LigaID:               int(ligaID.Int64),
		}
	}

	return &competidor, equipo, equipoCompetidor, nil
}
