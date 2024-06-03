package models

type JugadorTop struct {
	ID             int    `json:"id"`
	NombreJugador  string `json:"nombre_jugador"`
	EquipoInsignia string `json:"equipo_insignia"`
	PuntosTotales  int    `json:"puntos_totales"`
}
