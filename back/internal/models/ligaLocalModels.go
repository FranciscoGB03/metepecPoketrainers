package models

type Competidor struct {
	ID                 int                `json:"id"`
	Nombre             string             `json:"nombre"`
	EquipoInsigniaID   int                `json:"equipo_insignia_id"`
	Puntos             int                `json:"puntos"`
	EquipoInsignia     EquipoInsignia     `json:"equipo_insignia,omitempty"`
	EquipoCompetidores []EquipoCompetidor `json:"equipo_competidores,omitempty"`
}

type EquipoInsignia struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
}

type EquipoCompetidor struct {
	ID                   int           `json:"id"`
	CompetidorID         int           `json:"competidor_id"`
	Pokemon              *Pokemon      `json:"pokemon"`
	AtaqueRapido         AtaqueRapido  `json:"ataque_rapido"`
	PrimerAtaqueCargado  AtaqueCargado `json:"primer_ataque_cargado"`
	SegundoAtaqueCargado AtaqueCargado `json:"segundo_ataque_cargado"`
	Liga                 Liga          `json:"liga"`
}

type Liga struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
	PcMax  int    `json:"pc_max,omitempty"`
}
