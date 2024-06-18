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
	query := `INSERT INTO competidor (nombre, equipo_id, puntos, user_id) VALUES (?, ?, ?, ?)`
	result, err := r.db.Exec(query, competidor.Nombre, competidor.EquipoInsignia.ID, competidor.Puntos, competidor.UserId)
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
						pokemon_id, 
						ataque_rapido_id, 
						primer_ataque_cargado, 
						segundo_ataque_cargado, 
						liga_id) 
						VALUES(?, ?, ?, ?, ?, ?)`
		result, err := tx.Exec(query, poke.CompetidorID, poke.Pokemon.ID, poke.AtaqueRapido.ID, poke.PrimerAtaqueCargado.ID, poke.SegundoAtaqueCargado.ID, poke.Liga.ID)
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

func (r *CompetidorRepository) ActualizarCompetidor(competidor models.Competidor) (sql.Result, error) {
	query := `UPDATE competidor SET nombre=?, equipo_id=?, puntos=? WHERE id=?`
	result, err := r.db.Exec(query, competidor.Nombre, competidor.EquipoInsignia.ID, competidor.Puntos, competidor.ID)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *CompetidorRepository) DeleteCompetidor(id int) error {
	// Comienza una transacción
	tx, err := r.db.Begin()
	if err != nil {
		return err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
			return
		}
		err = tx.Commit()
	}()

	// Eliminar registros de equipo_competidor relacionados con el competidor
	queryDeleteEquipoCompetidor := `DELETE FROM equipo_competidor WHERE competidor_id = ?`
	_, err = tx.Exec(queryDeleteEquipoCompetidor, id)
	if err != nil {
		return err
	}

	// Eliminar el competidor de la tabla competidor
	queryDeleteCompetidor := `DELETE FROM competidor WHERE id = ?`
	_, err = tx.Exec(queryDeleteCompetidor, id)
	if err != nil {
		return err
	}

	return nil
}

func (r *CompetidorRepository) GetCompetidores() ([]models.Competidor, error) {
	query := `
		SELECT 
			c.id, c.nombre, c.equipo_id, c.puntos,
			e.id, e.nombre,
			ec.id, ec.competidor_id, ec.pokemon_id, 
			p.id, p.numero_pokedex, p.nombre, p.img_url,
			ar.id, ar.nombre_es, ar.nombre_la, ar.nombre_en,
			ac1.id, ac1.nombre_es, ac1.nombre_la, ac1.nombre_en,
			ac2.id, ac2.nombre_es, ac2.nombre_la, ac2.nombre_en,
			ec.liga_id, l.nombre
		FROM competidor c
		LEFT JOIN equipo_insignia e ON c.equipo_id = e.id
		LEFT JOIN equipo_competidor ec ON c.id = ec.competidor_id
		LEFT JOIN pokemon p ON p.id = ec.pokemon_id
		LEFT JOIN ataque_rapido ar ON ar.id = ec.ataque_rapido_id
		LEFT JOIN ataque_cargado ac1 ON ac1.id = ec.primer_ataque_cargado
		LEFT JOIN ataque_cargado ac2 ON ac2.id = ec.segundo_ataque_cargado
		LEFT JOIN liga l ON l.id=ec.liga_id
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
			if equipoCompetidor != nil {
				existingCompetidor.EquipoCompetidores = append(existingCompetidor.EquipoCompetidores, *equipoCompetidor)
			}
		} else {
			competidor.EquipoInsignia = equipo
			competidor.EquipoCompetidores = []models.EquipoCompetidor{}
			if equipoCompetidor != nil {
				competidor.EquipoCompetidores = append(competidor.EquipoCompetidores, *equipoCompetidor)
			}
			competidorMap[competidor.ID] = competidor
		}
	}

	for _, competidor := range competidorMap {
		if competidor.EquipoCompetidores == nil {
			competidor.EquipoCompetidores = []models.EquipoCompetidor{}
		}
		competidores = append(competidores, *competidor)
	}

	return competidores, nil
}

func scanCompetidor(rows *sql.Rows) (*models.Competidor, models.EquipoInsignia, *models.EquipoCompetidor, error) {
	var competidor models.Competidor
	var equipo models.EquipoInsignia
	var equipoCompetidor *models.EquipoCompetidor
	var eqID, ecID, compID, pokemonID, pokeID, numPokedex, ataqueRapidoID, primerAtaqueID, segundoAtaqueID, ligaID sql.NullInt64
	var eqNombre, pokemonNombre, imgUrl, ataqueRapidoNombreEs, ataqueRapidoNombreLa, ataqueRapidoNombreEn, primerAtaqueNombreEs, primerAtaqueNombreLa, primerAtaqueNombreEn, segundoAtaqueNombreEs, segundoAtaqueNombreLa, segundoAtaqueNombreEn, ligaNombre sql.NullString

	err := rows.Scan(
		&competidor.ID,
		&competidor.Nombre,
		&competidor.EquipoInsigniaID,
		&competidor.Puntos,
		&eqID,
		&eqNombre,
		&ecID,
		&compID,
		&pokemonID,
		&pokeID,
		&numPokedex,
		&pokemonNombre,
		&imgUrl,
		&ataqueRapidoID,
		&ataqueRapidoNombreEs,
		&ataqueRapidoNombreLa,
		&ataqueRapidoNombreEn,
		&primerAtaqueID,
		&primerAtaqueNombreEs,
		&primerAtaqueNombreLa,
		&primerAtaqueNombreEn,
		&segundoAtaqueID,
		&segundoAtaqueNombreEs,
		&segundoAtaqueNombreLa,
		&segundoAtaqueNombreEn,
		&ligaID,
		&ligaNombre,
	)
	if err != nil {
		return nil, equipo, nil, err
	}

	if eqID.Valid {
		equipo.ID = int(eqID.Int64)
	}
	if eqNombre.Valid {
		equipo.Nombre = eqNombre.String
	}
	if ecID.Valid && compID.Valid && pokemonID.Valid && ligaID.Valid {
		equipoCompetidor = &models.EquipoCompetidor{
			ID:                   int(ecID.Int64),
			CompetidorID:         int(compID.Int64),
			Pokemon:              &models.Pokemon{ID: int(pokemonID.Int64), NumeroPokedex: int(numPokedex.Int64), Nombre: pokemonNombre.String, ImgUrl: imgUrl.String},
			AtaqueRapido:         models.AtaqueRapido{ID: int(ataqueRapidoID.Int64), NombreEs: ataqueRapidoNombreEs.String, NombreLa: ataqueRapidoNombreLa.String, NombreEn: ataqueRapidoNombreEn.String},
			PrimerAtaqueCargado:  models.AtaqueCargado{ID: int(primerAtaqueID.Int64), NombreEs: primerAtaqueNombreEs.String, NombreLa: primerAtaqueNombreLa.String, NombreEn: primerAtaqueNombreEn.String},
			SegundoAtaqueCargado: models.AtaqueCargado{ID: int(segundoAtaqueID.Int64), NombreEs: segundoAtaqueNombreEs.String, NombreLa: segundoAtaqueNombreLa.String, NombreEn: segundoAtaqueNombreEn.String},
			Liga:                 models.Liga{ID: int(ligaID.Int64), Nombre: ligaNombre.String},
		}
	}

	return &competidor, equipo, equipoCompetidor, nil
}

func (r *CompetidorRepository) DeletePokemon(id int) error {
	query := `DELETE FROM equipo_competidor WHERE id = ?`
	_, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}
