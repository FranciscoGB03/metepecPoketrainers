package models

import "github.com/golang-jwt/jwt"

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Email       string   `json:"email"`
	Rol         string   `json:"rol"`
	Permissions []string `json:"permissions"`
	UserId      int64    `json:"user_id"`
	jwt.StandardClaims
}

type Permiso struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type Rol struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type RelRolPermiso struct {
	Rol      int       `json:"rol"`
	Permisos []Permiso `json:"permisos"`
}
