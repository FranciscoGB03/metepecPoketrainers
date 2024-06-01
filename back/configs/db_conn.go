package configs

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type Config struct {
	DBUser     string
	DBPassword string
	DBHost     string
	DBPort     string
	DBName     string
}

func GetConfig() Config {
	return Config{
		DBUser:     os.Getenv("MYSQL_USER"),
		DBPassword: os.Getenv("MYSQL_PASSWORD"),
		DBHost:     os.Getenv("DB_HOST"),
		DBPort:     os.Getenv("DB_PORT_MYSQL"),
		DBName:     os.Getenv("MYSQL_DATABASE"),
	}
}

func InitDB(cfg Config) (*sql.DB, error) {
	dbURI := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBName)
	db, err := sql.Open("mysql", dbURI)
	if err != nil {
		return nil, err
	}
	log.Println("Conexion a Mysql exitosa")
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	return db, nil
}
