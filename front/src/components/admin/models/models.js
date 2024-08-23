/**
 * Modelo para jugador Top
 */
export const JugadorTop = {
  nombre_jugador: "",
  equipo_insignia: "instinto",
  puntos_totales: 0,
};
/**
 * Modelo para competidor de liga local
 */
export const CompetidorModel = {
  nombre: "",
  equipo_insignia: { id: 1, nombre: "Instinto" },
  puntos: 0,
  user_id: 0,
};
/**
 * modelo para registro de pokemon en liga local
 */
export const PokemonCompetidor = {
  competidor_id: 2,
  pokemon: {},
  ataque_rapido: {},
  primer_ataque_cargado: {},
  segundo_ataque_cargado: {},
  liga: {},
};

export const EquipoTop = {
  liga: {},
  posicion: 0,
  pokemon1: {},
  ataque_rapido1: {},
  primer_cargado1: {},
  segundo_cargado1: {},
  pokemon2: {},
  ataque_rapido2: {},
  primer_cargado2: {},
  segundo_cargado2: {},
  pokemon3: {},
  ataque_rapido3: {},
  primer_cargado3: {},
  segundo_cargado3: {},
};

/** catalogos */
export const ROL = {
  nombre: "",
};

export const PERMISO = {
  nombre: "",
};
