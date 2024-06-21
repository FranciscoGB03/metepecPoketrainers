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
