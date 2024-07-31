package models

type JugadorTop struct {
	ID             int    `json:"id"`
	NombreJugador  string `json:"nombre_jugador"`
	EquipoInsignia string `json:"equipo_insignia"`
	PuntosTotales  int    `json:"puntos_totales"`
}

// DeleteJugadoresTopRequest es la estructura de la solicitud para eliminar múltiples jugadores
type DeleteJugadoresTopRequest struct {
	IDs []int `json:"ids"`
}

type EquipoTop struct {
	ID                  int           `json:"id"`
	Liga                Liga          `json:"liga"`
	Posicion            int           `json:"posicion"`
	Pokemon1            *Pokemon      `json:"pokemon1"`
	AtaqueRapidoPoke1   int           `json:"ataque_rapido_1"`
	AtaqueRapido1       AtaqueRapido  `json:"ataque_rapido1"`
	PrimerCargadoPoke1  int           `json:"primer_cargado_1"`
	PrimerCargado1      AtaqueCargado `json:"primer_cargado1"`
	SegundoCargadoPoke1 int           `json:"segundo_cargado_1"`
	SegundoCargado1     AtaqueCargado `json:"segundo_cargado1"`
	Pokemon2            *Pokemon      `json:"pokemon2"`
	AtaqueRapidoPoke2   int           `json:"ataque_rapido_2"`
	AtaqueRapido2       AtaqueRapido  `json:"ataque_rapido2"`
	PrimerCargadoPoke2  int           `json:"primer_cargado_2"`
	PrimerCargado2      AtaqueCargado `json:"primer_cargado2"`
	SegundoCargadoPoke2 int           `json:"segundo_cargado_2"`
	SegundoCargado2     AtaqueCargado `json:"segundo_cargado2"`
	Pokemon3            *Pokemon      `json:"pokemon3"`
	AtaqueRapidoPoke3   int           `json:"ataque_rapido_3"`
	AtaqueRapido3       AtaqueRapido  `json:"ataque_rapido3"`
	PrimerCargadoPoke3  int           `json:"primer_cargado_3"`
	PrimerCargado3      AtaqueCargado `json:"primer_cargado3"`
	SegundoCargadoPoke3 int           `json:"segundo_cargado_3"`
	SegundoCargado3     AtaqueCargado `json:"segundo_cargado3"`
}
