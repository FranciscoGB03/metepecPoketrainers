package models

import "github.com/dgrijalva/jwt-go"

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Email       string   `json:"email"`
	Rol         string   `json:"rol"`
	Permissions []string `json:"permissions"`
	jwt.StandardClaims
}
