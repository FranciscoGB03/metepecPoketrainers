package repositories

import (
	"back/internal/models"
	"database/sql"
)

type CatologosRepository struct {
	db *sql.DB
}

func NewCatalogosRepository(db *sql.DB) *CatologosRepository {
	return &CatologosRepository{db}
}

// Metodo para consultar catalogos de liga y equipo insignia
func (r *CatologosRepository) GetLigasEquipos() (models.LigaEquipo, error) {
	var ligas []models.Liga
	var equipos []models.EquipoInsignia
	// variable a retornar
	var catalogos models.LigaEquipo
	// Obtencion del catalogo de ligas
	rows, err := r.db.Query("SELECT id, nombre, pc_max FROM liga")
	if err != nil {
		return catalogos, err
	}
	defer rows.Close()

	for rows.Next() {
		var liga models.Liga
		if err := rows.Scan(&liga.ID, &liga.Nombre, &liga.PcMax); err != nil {
			return catalogos, err
		}
		ligas = append(ligas, liga)
	}
	if err := rows.Err(); err != nil {
		return catalogos, err
	}
	// Obtencion del catalogo de equipo insignia
	rows, err = r.db.Query("SELECT id, nombre FROM equipo_insignia")
	if err != nil {
		return catalogos, err
	}
	defer rows.Close()

	for rows.Next() {
		var equipo models.EquipoInsignia
		if err := rows.Scan(&equipo.ID, &equipo.Nombre); err != nil {
			return catalogos, err
		}
		equipos = append(equipos, equipo)
	}
	if err := rows.Err(); err != nil {
		return catalogos, err
	}
	//asignacion de catalogos a las variables
	catalogos.Liga = ligas
	catalogos.EquipoInsignia = equipos
	return catalogos, nil
}
