import { SlArrowDown } from "react-icons/sl";
import PropTypes from "prop-types";

const FormularioTab = ({
  tab,
  equipo,
  pokemon,
  rapido,
  cargado1,
  cargado2,
  handleChange,
  pokemons,
  rapidos,
  cargados,
}) => {
  return (
    <div id={tab} className="flex flex-wrap tab-pane">
      <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
          htmlFor="grid-first-name"
        >
          Pokemon:{" "}
        </label>
        <div className="relative flex w-full">
          <select
            name={pokemon}
            className="appearance-none row-start-1 col-start-1 block w-full mt-2  border border-gray-200
          text-sm rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => handleChange(e, pokemons)}
            value={equipo[pokemon]?.id}
          >
            <option value="">Selecciona un Pokémon</option>
            {pokemons.map((poke) => (
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
            name={rapido}
            onChange={(e) => handleChange(e, rapidos)}
            value={equipo[rapido]?.id}
          >
            <option value="">Selecciona un Ataque Rápido</option>
            {rapidos.map((rapido) => (
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
            name={cargado1}
            onChange={(e) => handleChange(e, cargados)}
            value={equipo[cargado1]?.id}
          >
            <option value="">Primer Ataque Cargado</option>
            {cargados.map((cargado) => (
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
            name={cargado2}
            onChange={(e) => handleChange(e, cargados)}
            value={equipo[cargado2]?.id}
          >
            <option value="">Segundo Ataque Cargado</option>
            {cargados.map((cargado) => (
              <option key={cargado.id} value={cargado.id}>
                {cargado.nombre_la}
              </option>
            ))}
          </select>
          <SlArrowDown className="!absolute right-4 top-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

FormularioTab.propTypes = {
  handleChange: PropTypes.func,
  equipo: PropTypes.object,
  pokemons: PropTypes.array,
  rapidos: PropTypes.array,
  cargados: PropTypes.array,
  tab: PropTypes.string,
  pokemon: PropTypes.string,
  rapido: PropTypes.string,
  cargado1: PropTypes.string,
  cargado2: PropTypes.string,
};

export default FormularioTab;
