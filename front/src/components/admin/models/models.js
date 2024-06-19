import { getUID } from "../../auth/helpers";

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
  user_id:0,
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
