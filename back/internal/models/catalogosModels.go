package models

type LigaEquipo struct {
	Liga           []Liga
	EquipoInsignia []EquipoInsignia
}

type Pokemon struct {
	ID            int    `json:"id"`
	NumeroPokedex int    `json:"numero_pokedex"`
	Nombre        string `json:"nombre"`
	ImgUrl        string `json:"img_url"`
}

type AtaqueRapido struct {
	ID       int    `json:"id"`
	NombreEs string `json:"nombre_es"`
	NombreLa string `json:"nombre_la"`
	NombreEn string `json:"nombre_en"`
}

type AtaqueCargado struct {
	ID       int    `json:"id"`
	NombreEs string `json:"nombre_es"`
	NombreLa string `json:"nombre_la"`
	NombreEn string `json:"nombre_en"`
}
