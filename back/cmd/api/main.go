package main

import (
	"back/configs"
	"back/internal/routes"
	"log"
	"net/http"

	"github.com/rs/cors"
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
	// Configuración del middleware CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})
	//asignacion de rutas
	router := routes.SetupRouter(db)

	log.Printf("Server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler.Handler(router)))
}
