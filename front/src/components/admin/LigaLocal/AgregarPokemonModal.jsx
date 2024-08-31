import PropTypes from "prop-types";
import { PokemonCompetidor } from "../models/models";
import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { GET_LIGA_LOCAL, REGISTRAR_EQUIPO_LOCAL } from "../../../utils/urls";

/**
 * Modal para agregar pokemons
 * @param {isOpen} param0
 * @returns modal para agregar un pokemon
 */
const AgregarPokemonModal = ({
  isOpen,
  onClose,
  competidorId,
  pokemons,
  ligas,
  rapidos,
  cargados,
  sendRequest,
}) => {
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
    await sendRequest("POST", REGISTRAR_EQUIPO_LOCAL, pokemones, "addPokemon");
    await sendRequest("GET", GET_LIGA_LOCAL, {}, "competidores");
    onClose();
  };
  /**validacion de modal */
  if (!isOpen) return null;
  /**render */
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="relative flex w-full">
          <h1 className="text-xl	text-gray-400 	">Agrega Pokemons</h1>
          <button
            className="!absolute right-1 top-1 px-3 text-center align-middle text-xl text-gray-400 hover:text-gray-900"
            onClick={() => {
              onClose();
            }}
          >
            X
          </button>
        </div>
        <hr className="h-px my-3 bg-gray-200 border-0 " />
        <div className="w-full max-w-lg flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-first-name"
            >
              Pokemon:{" "}
            </label>
            <div className="relative flex w-full">
              <select
                name="pokemon"
                className="appearance-none row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                   text-sm rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <SlArrowDown className="!absolute right-4 top-6 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-first-name"
            >
              Ataque rápido:{" "}
            </label>
            <div className="relative flex w-full">
              <select
                className="appearance-none text-sm row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <SlArrowDown className="!absolute right-4 top-6 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-first-name"
            >
              Primer ataque cargado:{" "}
            </label>
            <div className="relative flex w-full">
              <select
                className="appearance-none text-sm row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="primer_ataque_cargado"
                onChange={(e) => handleChange(e, cargadosArray)}
                value={pokemon.primer_ataque_cargado.id}
              >
                <option value="">Primer Ataque Cargado</option>
                {cargadosArray.map((cargado) => (
                  <option key={cargado.id} value={cargado.id}>
                    {cargado.nombre_la}
                  </option>
                ))}
              </select>
              <SlArrowDown className="!absolute right-4 top-6 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-first-name"
            >
              Segundo ataque cargado:{" "}
            </label>
            <div className="relative flex w-full">
              <select
                className="appearance-none text-sm row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="segundo_ataque_cargado"
                onChange={(e) => handleChange(e, cargadosArray)}
                value={pokemon.segundo_ataque_cargado.id}
              >
                <option value="">Segundo Ataque Cargado</option>
                {cargadosArray.map((cargado) => (
                  <option key={cargado.id} value={cargado.id}>
                    {cargado.nombre_la}
                  </option>
                ))}
              </select>
              <SlArrowDown className="!absolute right-4 top-6 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
              htmlFor="grid-first-name"
            >
              Seleccione la liga:{" "}
            </label>
            <div className="relative flex w-full">
              <select
                className="appearance-none text-sm row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <SlArrowDown className="!absolute right-4 top-6 text-gray-400" />
            </div>
          </div>
        </div>
        <div>
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
  sendRequest: PropTypes.func.isRequired,
};

export default AgregarPokemonModal;
