import PropTypes from "prop-types";
import { PokemonCompetidor } from "../models/models";
import { useEffect, useState } from "react";
/**
 * Modal para agregar pokemons
 * @param {isOpen} param0  
 * @returns modal para agregar un pokemon 
 */
const AgregarPokemonModal = ({ isOpen, onClose, competidorId, pokemons, ligas, rapidos, cargados, sendRequest }) => {
  /**hooks */
  const [pokemon, setPokemon] = useState(PokemonCompetidor);
  // Asegurarse de que las props sean arrays antes de intentar mapear
  const pokemonsArray = Array.isArray(pokemons) ? pokemons : [];
  const ligasArray = Array.isArray(ligas) ? ligas : [];
  const rapidosArray = Array.isArray(rapidos) ? rapidos : [];
  const cargadosArray = Array.isArray(cargados) ? cargados : [];

  /** useEffect */
  useEffect(() => {
    setPokemon({ ...pokemon, competidor_id: competidorId });
  }, [competidorId]);

  /**functions */
  /** Función para manejar el cambio en los select */
  const handleChange = (e, catalogo) => {
    const { name, value } = e.target;
    const po = catalogo.find((p) => {
      if (p.id == value) {
        return p;
      }
    });
    setPokemon({ ...pokemon, [name]: po });
  };
  /** function that saves a pokemon */
  const savePokemon = async () => {
    const pokemones = new Array();
    pokemones.push(pokemon);
    await sendRequest("POST", "/registrarEquipo", pokemones,"addPokemon");
    await sendRequest("GET", "/getLigaLocal", {}, "competidores");
    setPokemon(PokemonCompetidor)
    onClose();
  };
  /**validacion de modal */
  if (!isOpen) return null;
  /**render */
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="mb-4 text-gray-600 hover:text-gray-900"
          onClick={()=>{onClose();}}
        >
          Cerrar
        </button>
        <div>
          <label>
            Pokemon:{" "}
            <select
              name="pokemon"
              onChange={(e) => handleChange(e, pokemonsArray)}
              value={pokemon.pokemon.id}
            >
              <option value="">Selecciona un Pokémon</option>
              {pokemonsArray.map((poke) => (
                <option key={poke.id} value={poke.id}>
                  {poke.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ataque rápido:{" "}
            <select
              name="ataque_rapido"
              onChange={(e) => handleChange(e, rapidosArray)}
              value={pokemon.ataque_rapido.id}
            >
              <option value="">Selecciona un Ataque Rápido</option>
              {rapidosArray.map((rapido) => (
                <option key={rapido.id} value={rapido.id}>
                  {rapido.nombre_la}
                </option>
              ))}
            </select>
          </label>
          <label>
            Primer ataque cargado:{" "}
            <select
              name="primer_ataque_cargado"
              onChange={(e) => handleChange(e, cargadosArray)}
              value={pokemon.primer_ataque_cargado.id}
            >
              <option value="">Selecciona un Primer Ataque Cargado</option>
              {cargadosArray.map((cargado) => (
                <option key={cargado.id} value={cargado.id}>
                  {cargado.nombre_la}
                </option>
              ))}
            </select>
          </label>
          <label>
            Segundo ataque cargado:{" "}
            <select
              name="segundo_ataque_cargado"
              onChange={(e) => handleChange(e, cargadosArray)}
              value={pokemon.segundo_ataque_cargado.id}
            >
              <option value="">Selecciona un Segundo Ataque Cargado</option>
              {cargadosArray.map((cargado) => (
                <option key={cargado.id} value={cargado.id}>
                  {cargado.nombre_la}
                </option>
              ))}
            </select>
          </label>
          <label>
            Seleccione la liga:{" "}
            <select
              name="liga"
              onChange={(e) => handleChange(e, ligasArray)}
              value={pokemon.liga.id}
            >
              <option value="">Selecciona liga</option>
              {ligasArray.map((liga) => (
                <option key={liga.id} value={liga.id}>
                  {liga.nombre}
                </option>
              ))}
            </select>
          </label>

          <button onClick={savePokemon}>Guardar</button>
        </div>
      </div>
    </div>
  );
};
/**
 * indica los tipos de datos que recibe el componente
 */
AgregarPokemonModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  competidorId: PropTypes.number,
  pokemons: PropTypes.array,
  ligas: PropTypes.array,
  rapidos: PropTypes.array,
  cargados: PropTypes.array,
  sendRequest: PropTypes.func.isRequired
};

export default AgregarPokemonModal;
