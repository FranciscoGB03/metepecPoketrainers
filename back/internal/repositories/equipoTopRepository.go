package repositories

import (
	"back/internal/models"
	"database/sql"
)

type EquipoTopRepository struct {
	db *sql.DB
}

func NewEquiposTopRepository(db *sql.DB) *EquipoTopRepository {
	return &EquipoTopRepository{db}
}

func (r *EquipoTopRepository) DeleteTopTeam(id int) (sql.Result, error) {
	query := `DELETE FROM equipo_top WHERE id = ?`
	result, err := r.db.Exec(query, id)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (r *EquipoTopRepository) CreateTopTeam(equipoTop models.EquipoTop) (models.EquipoTop, error) {
	query := "INSERT INTO equipo_top (liga_id, posicion, pokemon1, ataque_rapido1, primer_cargado1, segundo_cargado1, pokemon2, ataque_rapido2, primer_cargado2, segundo_cargado2, pokemon3, ataque_rapido3, primer_cargado3, segundo_cargado3) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
	result, err := r.db.Exec(query, equipoTop.Liga.ID, equipoTop.Posicion, equipoTop.Pokemon1.ID, equipoTop.AtaqueRapido1.ID, equipoTop.PrimerCargado1.ID, equipoTop.SegundoCargado1.ID, equipoTop.Pokemon2.ID, equipoTop.AtaqueRapido2.ID, equipoTop.PrimerCargado2.ID, equipoTop.SegundoCargado2.ID, equipoTop.Pokemon3.ID, equipoTop.AtaqueRapido3.ID, equipoTop.PrimerCargado3.ID, equipoTop.SegundoCargado3.ID)
	if err != nil {
		return models.EquipoTop{}, err
	}
	// Obtener el ID del último insertado si es necesario
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return models.EquipoTop{}, err
	}
	equipoTop.ID = int(lastInsertID)

	return equipoTop, nil
}

func (r *EquipoTopRepository) GetAllEquiposTop() ([]models.EquipoTop, error) {
	// variables
	var equiposTop []models.EquipoTop
	// query
	query := `
		SELECT 
			et.id, 
			l.id,
			l.nombre, 
			et.posicion, 
			et.pokemon1,
			p1.id AS p1_id,
			p1.numero_pokedex AS p1_num,
			p1.nombre AS p1_nom,
			p1.img_url AS p1_img,
			et.ataque_rapido1,
			ar1.id AS ar1_id,
			ar1.nombre_es AS ar1_nom_es,
			ar1.nombre_la AS ar1_nom_la,
			ar1.nombre_en AS ar1_nom_en,
			et.primer_cargado1, 
			ac1.id AS ac1_id,
			ac1.nombre_es AS ac1_nom_es,
			ac1.nombre_la AS ac1_nom_la,
			ac1.nombre_en AS ac1_nom_en,
			et.segundo_cargado1,
			ac2.id AS ac2_id,
			ac2.nombre_es AS ac2_nom_es,
			ac2.nombre_la AS ac2_nom_la,
			ac2.nombre_en AS ac2_nom_en,
			et.pokemon2, 
			p2.id AS p2_id,
			p2.numero_pokedex AS p2_num,
			p2.nombre AS p2_nom,
			p2.img_url AS p2_img,
			et.ataque_rapido2,
			ar2.id AS ar2_id,
			ar2.nombre_es AS ar2_nom_es,
			ar2.nombre_la AS ar2_nom_la,
			ar2.nombre_en AS ar2_nom_en,
			et.primer_cargado2, 
			ac3.id AS ac3_id,
			ac3.nombre_es AS ac3_nom_es,
			ac3.nombre_la AS ac3_nom_la,
			ac3.nombre_en AS ac3_nom_en,
			et.segundo_cargado2,
			ac4.id AS ac4_id,
			ac4.nombre_es AS ac4_nom_es,
			ac4.nombre_la AS ac4_nom_la,
			ac4.nombre_en AS ac4_nom_en,    
			et.pokemon3, 
			p3.id AS p3_id,
			p3.numero_pokedex AS p3_num,
			p3.nombre AS p3_nom,
			p3.img_url AS p3_img,
			et.ataque_rapido3,
			ar3.id AS ar3_id,
			ar3.nombre_es AS ar3_nom_es,
			ar3.nombre_la AS ar3_nom_la,
			ar3.nombre_en AS ar3_nom_en,
			et.primer_cargado3, 
			ac5.id AS ac5_id,
			ac5.nombre_es AS ac5_nom_es,
			ac5.nombre_la AS ac5_nom_la,
			ac5.nombre_en AS ac5_nom_en,
			et.segundo_cargado3,
			ac6.id AS ac6_id,
			ac6.nombre_es AS ac6_nom_es,
			ac6.nombre_la AS ac6_nom_la,
			ac6.nombre_en AS ac6_nom_en
		FROM 
			equipo_top et 
		LEFT JOIN 
			liga l ON l.id = et.liga_id
		LEFT JOIN 
			pokemon p1 ON p1.id = et.pokemon1
		LEFT JOIN 
			ataque_rapido ar1 ON ar1.id = et.ataque_rapido1
		LEFT JOIN 
			ataque_cargado ac1 ON ac1.id = et.primer_cargado1
		LEFT JOIN 
			ataque_cargado ac2 ON ac2.id = et.segundo_cargado1
		LEFT JOIN 
			pokemon p2 ON p2.id = et.pokemon2
		LEFT JOIN 
			ataque_rapido ar2 ON ar2.id = et.ataque_rapido2
		LEFT JOIN 
			ataque_cargado ac3 ON ac3.id = et.primer_cargado2
		LEFT JOIN 
			ataque_cargado ac4 ON ac4.id = et.segundo_cargado2
		LEFT JOIN 
			pokemon p3 ON p3.id = et.pokemon3
		LEFT JOIN 
			ataque_rapido ar3 ON ar3.id = et.ataque_rapido3
		LEFT JOIN 
			ataque_cargado ac5 ON ac5.id = et.primer_cargado3
		LEFT JOIN 
			ataque_cargado ac6 ON ac6.id = et.segundo_cargado3;
	`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var equipo models.EquipoTop
		var liga models.Liga
		var pokemon1, pokemon2, pokemon3 models.Pokemon
		var ataqueRapido1, ataqueRapido2, ataqueRapido3 models.AtaqueRapido
		var primerCargado1, primerCargado2, primerCargado3 models.AtaqueCargado
		var segundoCargado1, segundoCargado2, segundoCargado3 models.AtaqueCargado
		var pokemon1ID, pokemon2ID, pokemon3ID int
		err := rows.Scan(
			&equipo.ID,
			&liga.ID,
			&liga.Nombre,
			&equipo.Posicion,
			&pokemon1ID,
			&pokemon1.ID,
			&pokemon1.NumeroPokedex,
			&pokemon1.Nombre,
			&pokemon1.ImgUrl,
			&equipo.AtaqueRapidoPoke1,
			&ataqueRapido1.ID,
			&ataqueRapido1.NombreEs,
			&ataqueRapido1.NombreLa,
			&ataqueRapido1.NombreEn,
			&equipo.PrimerCargadoPoke1,
			&primerCargado1.ID,
			&primerCargado1.NombreEs,
			&primerCargado1.NombreLa,
			&primerCargado1.NombreEn,
			&equipo.SegundoCargadoPoke1,
			&segundoCargado1.ID,
			&segundoCargado1.NombreEs,
			&segundoCargado1.NombreLa,
			&segundoCargado1.NombreEn,
			&pokemon2ID,
			&pokemon2.ID,
			&pokemon2.NumeroPokedex,
			&pokemon2.Nombre,
			&pokemon2.ImgUrl,
			&equipo.AtaqueRapidoPoke2,
			&ataqueRapido2.ID,
			&ataqueRapido2.NombreEs,
			&ataqueRapido2.NombreLa,
			&ataqueRapido2.NombreEn,
			&equipo.PrimerCargadoPoke2,
			&primerCargado2.ID,
			&primerCargado2.NombreEs,
			&primerCargado2.NombreLa,
			&primerCargado2.NombreEn,
			&equipo.SegundoCargadoPoke2,
			&segundoCargado2.ID,
			&segundoCargado2.NombreEs,
			&segundoCargado2.NombreLa,
			&segundoCargado2.NombreEn,
			&pokemon3ID,
			&pokemon3.ID,
			&pokemon3.NumeroPokedex,
			&pokemon3.Nombre,
			&pokemon3.ImgUrl,
			&equipo.AtaqueRapidoPoke3,
			&ataqueRapido3.ID,
			&ataqueRapido3.NombreEs,
			&ataqueRapido3.NombreLa,
			&ataqueRapido3.NombreEn,
			&equipo.PrimerCargadoPoke3,
			&primerCargado3.ID,
			&primerCargado3.NombreEs,
			&primerCargado3.NombreLa,
			&primerCargado3.NombreEn,
			&equipo.SegundoCargadoPoke3,
			&segundoCargado3.ID,
			&segundoCargado3.NombreEs,
			&segundoCargado3.NombreLa,
			&segundoCargado3.NombreEn,
		)
		if err != nil {
			return nil, err
		}

		equipo.Liga = liga
		equipo.Pokemon1 = &pokemon1
		equipo.Pokemon2 = &pokemon2
		equipo.Pokemon3 = &pokemon3
		equipo.AtaqueRapido1 = ataqueRapido1
		equipo.PrimerCargado1 = primerCargado1
		equipo.SegundoCargado1 = segundoCargado1
		equipo.AtaqueRapido2 = ataqueRapido2
		equipo.PrimerCargado2 = primerCargado2
		equipo.SegundoCargado2 = segundoCargado2
		equipo.AtaqueRapido3 = ataqueRapido3
		equipo.PrimerCargado3 = primerCargado3
		equipo.SegundoCargado3 = segundoCargado3

		equiposTop = append(equiposTop, equipo)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return equiposTop, nil
}
