package handlers

import (
	"back/internal/models"
	"back/internal/repositories"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// Método para realizar la consulta de la tabla de top_mundial
func GetTopMundial(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		jugadorRepo := repositories.NewJugadorRepository(db)

		jugadores, err := jugadorRepo.GetJugadores()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(jugadores)
	}

}

// Método para registrar un jugador top
func PostSaveJugadorTop(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// objeto para mapear la informacion entrante
		var jugador models.JugadorTop

		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&jugador)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// llamada al repositorio
		jugadorRepo := repositories.NewJugadorRepository(db)

		jugador, err = jugadorRepo.SaveJugadorTop(jugador)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		json.NewEncoder(w).Encode(jugador)
	}
}

// Metodo para actualizar la información de un jugador
func PutJugadorTop(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// objeto para mapear la informacion entrante
		var jugador models.JugadorTop

		// Parsear el body del request como JSON
		err := json.NewDecoder(r.Body).Decode(&jugador)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// llamada al repositorio
		jugadorRepo := repositories.NewJugadorRepository(db)

		result, err := jugadorRepo.UpdateJugadorTop(jugador)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Error al obtener las filas afectadas", http.StatusInternalServerError)
			return
		}

		if rowsAffected == 0 {
			http.Error(w, "No se encontraron cambios en el registro", http.StatusAccepted)
			return
		}

		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message":      "Registro actualizado correctamente",
			"rowsAffected": rowsAffected,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// Método para eliminar un solo jugador top
func DeteleJugadorTop(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		//obteniendo el id a eliminar
		idStr := vars["id"]
		// Convertir el id a entero
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "ID inválido", http.StatusBadRequest)
			return
		}
		jugadorRepo := repositories.NewJugadorRepository(db)
		result, err := jugadorRepo.DeleteJugadorTop(id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Error al obtener las filas afectadas", http.StatusInternalServerError)
			return
		}

		if rowsAffected == 0 {
			http.Error(w, "No se encontró el registro", http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK) // Cambiar el estado a 200 OK
		response := map[string]interface{}{
			"message":      "Registro eliminado correctamente",
			"rowsAffected": rowsAffected,
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}

// Metodo para eliminar desde 1 hasta n jugadores top
func DeteleAllJugadoresTop(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Decodificar el cuerpo de la solicitud
		var req models.DeleteJugadoresTopRequest
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			http.Error(w, "Solicitud inválida", http.StatusBadRequest)
			return
		}

		if len(req.IDs) == 0 {
			http.Error(w, "No se proporcionaron IDs", http.StatusBadRequest)
			return
		}

		jugadorRepo := repositories.NewJugadorRepository(db)
		result, err := jugadorRepo.DeleteAllJugadoresTop(req.IDs)

		if err != nil {
			http.Error(w, "Error al eliminar los jugadores", http.StatusInternalServerError)
			return
		}

		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Error al obtener las filas afectadas", http.StatusInternalServerError)
			return
		}

		response := map[string]interface{}{
			"message":      "Registros eliminados correctamente",
			"rowsAffected": rowsAffected,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}
}
