package main

import (
	"back/configs"
	"back/internal/routes"
	"log"
	"net/http"

	"github.com/spf13/viper"
)

type Config struct {
}

func main() {
	// Obtener la configuración de la base de datos desde config.go
	cfg := configs.GetConfig()
	db, err := configs.InitDB(cfg)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	viper.SetConfigFile("configs/config.yaml")
	err = viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Error reading config file, %s", err)
	}

	port := viper.GetString("server.port")
	router := routes.SetupRouter(db)

	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
