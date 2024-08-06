package repositories

import (
	"back/internal/models"
	"database/sql"
)

type AdminRepository struct {
	db *sql.DB
}

func NewAdminRepository(db *sql.DB) *AdminRepository {
	return &AdminRepository{db}
}

func (r *AdminRepository) SavePermissionsByRole(id int, permisos []models.Permiso) error {

	// Recuperar permisos actuales
	currentPermisos, err := r.GetAllPermissionsByRole(id)
	if err != nil {
		return err
	}

	// Crear un mapa de permisos actuales para facilidad de acceso
	currentPermisoMap := make(map[int]struct{})
	for _, permiso := range currentPermisos {
		currentPermisoMap[permiso.ID] = struct{}{}
	}

	// Crear un mapa de nuevos permisos para facilidad de acceso
	newPermisoMap := make(map[int]struct{})
	for _, permiso := range permisos {
		newPermisoMap[permiso.ID] = struct{}{}
	}

	// Eliminar permisos que ya no están en la lista de nuevos permisos
	for permisoID := range currentPermisoMap {
		if _, found := newPermisoMap[permisoID]; !found {
			query := "DELETE FROM rel_rol_permisos WHERE rol_id = ? AND permiso_id = ?"
			_, err := r.db.Exec(query, id, permisoID)
			if err != nil {
				return err
			}
		}
	}

	// Agregar nuevos permisos que no existen actualmente
	for _, permiso := range permisos {
		exists, err := r.permisoExiste(id, permiso.ID)
		if err != nil {
			return err
		}
		if !exists {
			query := "INSERT INTO rel_rol_permisos (rol_id, permiso_id) VALUES (?, ?)"
			_, err := r.db.Exec(query, id, permiso.ID)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (r *AdminRepository) permisoExiste(rol int, permisoID int) (bool, error) {
	var exists bool
	query := "SELECT EXISTS (SELECT 1 FROM rel_rol_permisos WHERE rol_id = ? AND permiso_id = ?)"
	err := r.db.QueryRow(query, rol, permisoID).Scan(&exists)
	return exists, err
}

func (r *AdminRepository) GetAllPermissions() ([]models.Permiso, error) {
	var permisos []models.Permiso
	query := `SELECT * FROM permisos`
	// Obtencion del catalogo de ligas
	rows, err := r.db.Query(query)
	if err != nil {
		return permisos, err
	}
	defer rows.Close()

	for rows.Next() {
		var permiso models.Permiso
		if err := rows.Scan(&permiso.ID, &permiso.Nombre); err != nil {
			return permisos, err
		}
		permisos = append(permisos, permiso)
	}
	if err := rows.Err(); err != nil {
		return permisos, err
	}
	return permisos, nil
}
func (r *AdminRepository) GetAllPermissionsByRole(rolId int) ([]models.Permiso, error) {
	var permisos []models.Permiso
	query := `SELECT p.id, p.nombre 
			FROM rel_rol_permisos rrp 
			LEFT JOIN 
				permisos p ON rrp.permiso_id = p.id
			WHERE
				rrp.rol_id=?
			`
	// Obtencion de la  consulta
	rows, err := r.db.Query(query, rolId)
	if err != nil {
		return permisos, err
	}
	defer rows.Close()

	for rows.Next() {
		var permiso models.Permiso
		if err := rows.Scan(&permiso.ID, &permiso.Nombre); err != nil {
			return permisos, err
		}
		permisos = append(permisos, permiso)
	}
	if err := rows.Err(); err != nil {
		return permisos, err
	}
	return permisos, nil
}

func (r *AdminRepository) GetAllRoles() ([]models.Rol, error) {
	var roles []models.Rol
	query := `SELECT * FROM rol`
	// Obtencion del catalogo de ligas
	rows, err := r.db.Query(query)
	if err != nil {
		return roles, err
	}
	defer rows.Close()

	for rows.Next() {
		var rol models.Rol
		if err := rows.Scan(&rol.ID, &rol.Nombre); err != nil {
			return roles, err
		}
		roles = append(roles, rol)
	}
	if err := rows.Err(); err != nil {
		return roles, err
	}
	return roles, nil
}
