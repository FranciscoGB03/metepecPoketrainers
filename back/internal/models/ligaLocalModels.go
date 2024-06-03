package models

type Competidor struct {
	ID       int    `json:"id"`
	Nombre   string `json:"nombre"`
	EquipoID int    `json:"equipo_id"`
	Puntos   int    `json:"puntos"`
	//CreatedAt          time.Time          `json:"created_at,omitempty"`
	Equipo             EquipoInsignia     `json:"equipo"`
	EquipoCompetidores []EquipoCompetidor `json:"equipo_competidores"`
}

type EquipoInsignia struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type EquipoCompetidor struct {
	ID                   int    `json:"id"`
	CompetidorID         int    `json:"competidor_id"`
	Pokemon              string `json:"pokemon"`
	AtaqueBasico         string `json:"ataque_basico"`
	PrimerAtaqueCargado  string `json:"primer_ataque_cargado"`
	SegundoAtaqueCargado string `json:"segundo_ataque_cargado"`
	URLPokemon           string `json:"url_pokemon"`
	LigaID               int    `json:"liga_id"`
}

type Liga struct {
	ID        int    `json:"id"`
	Nombre    string `json:"nombre"`
	PuntosMax int    `json:"puntos_max"`
}
