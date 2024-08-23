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

// Metodo para actualizar permisos
func (r *CatologosRepository) UpdatePermission(permiso models.Permiso) (sql.Result, error) {
	query := `UPDATE permisos SET nombre=? WHERE id=?`
	result, err := r.db.Exec(query, permiso.Nombre, permiso.ID)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Metodo para eliminar permisos
func (r *CatologosRepository) DeletePermission(id int) (sql.Result, error) {
	query := `DELETE FROM permisos WHERE id = ?`
	result, err := r.db.Exec(query, id)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Metodo para guardar permisos
func (r *CatologosRepository) SavePermission(permiso models.Permiso) (models.Permiso, error) {
	query := "INSERT INTO permisos (nombre) VALUES(?)"
	result, err := r.db.Exec(query, permiso.Nombre)
	if err != nil {
		return models.Permiso{}, err
	}
	// Obtener el ID del último insertado si es necesario
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return models.Permiso{}, err
	}
	permiso.ID = int(lastInsertID)

	return permiso, nil
}

// Metodo para actualizar rol por id
func (r *CatologosRepository) UpdateRol(rol models.Rol) (sql.Result, error) {
	query := `UPDATE rol SET nombre=? WHERE id=?`
	result, err := r.db.Exec(query, rol.Nombre, rol.ID)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Metodo para eliminar roles
func (r *CatologosRepository) DeleteRol(id int) (sql.Result, error) {
	query := `DELETE FROM rol WHERE id = ?`
	result, err := r.db.Exec(query, id)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Metodo para guardar roles
func (r *CatologosRepository) SaveRol(rol models.Rol) (models.Rol, error) {
	query := "INSERT INTO rol (nombre) VALUES(?)"
	result, err := r.db.Exec(query, rol.Nombre)
	if err != nil {
		return models.Rol{}, err
	}
	// Obtener el ID del último insertado si es necesario
	lastInsertID, err := result.LastInsertId()
	if err != nil {
		return models.Rol{}, err
	}
	rol.ID = int(lastInsertID)

	return rol, nil
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

func (r *CatologosRepository) GetAtaquesRapidos() ([]models.AtaqueRapido, error) {
	var ataquesRapidos []models.AtaqueRapido

	// Obtencion del catalogo de ligas
	rows, err := r.db.Query("SELECT id, nombre_es,nombre_la, nombre_en FROM ataque_rapido")
	if err != nil {
		return ataquesRapidos, err
	}
	defer rows.Close()

	for rows.Next() {
		var ataque models.AtaqueRapido
		if err := rows.Scan(&ataque.ID, &ataque.NombreEs, &ataque.NombreLa, &ataque.NombreEn); err != nil {
			return ataquesRapidos, err
		}
		ataquesRapidos = append(ataquesRapidos, ataque)
	}
	if err := rows.Err(); err != nil {
		return ataquesRapidos, err
	}
	return ataquesRapidos, nil
}

func (r *CatologosRepository) GetAtaquesCargados() ([]models.AtaqueCargado, error) {
	var ataquesCargados []models.AtaqueCargado

	// Obtencion del catalogo de ligas
	rows, err := r.db.Query("SELECT id, nombre_es,nombre_la, nombre_en FROM ataque_cargado")
	if err != nil {
		return ataquesCargados, err
	}
	defer rows.Close()

	for rows.Next() {
		var ataque models.AtaqueCargado
		if err := rows.Scan(&ataque.ID, &ataque.NombreEs, &ataque.NombreLa, &ataque.NombreEn); err != nil {
			return ataquesCargados, err
		}
		ataquesCargados = append(ataquesCargados, ataque)
	}
	if err := rows.Err(); err != nil {
		return ataquesCargados, err
	}
	return ataquesCargados, nil
}
