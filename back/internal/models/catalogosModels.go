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
