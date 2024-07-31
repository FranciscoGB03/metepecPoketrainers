import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import PropTypes from "prop-types";

const BodyModal = ({ handleChange, equipo, pokemons, rapidos, cargados }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="w-full max-w-lg flex flex-wrap -mx-3 mb-6">
      <div className="w-full tabs flex border-b-2 mb-4 justify-center">
        <button
          className={`tab-button text-gray-600 py-2 px-4 font-semibold border-b-2 ${
            activeTab === "tab1"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } ${
            equipo.pokemon1.id !== undefined
              ? "bg-green-800 text-white"
              : "bg-red-900 text-white"
          }`}
          onClick={() => handleTabClick("tab1")}
        >
          Pokemon 1
        </button>
        <button
          className={`tab-button text-gray-600 py-2 px-4 font-semibold border-b-2 ${
            activeTab === "tab2"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } ${
            equipo.pokemon2.id !== undefined
              ? "bg-green-800 text-white"
              : "bg-red-900 text-white"
          }`}
          onClick={() => handleTabClick("tab2")}
        >
          Pokemon 2
        </button>
        <button
          className={`tab-button text-gray-600 py-2 px-4 font-semibold border-b-2 ${
            activeTab === "tab3"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          } ${
            equipo.pokemon3.id !== undefined
              ? "bg-green-800 text-white"
              : "bg-red-900 text-white"
          }`}
          onClick={() => handleTabClick("tab3")}
        >
          Pokemon 3
        </button>
      </div>

      <div className="w-full tab-content">
        {activeTab === "tab1" && (
          <div id="tab1" className="flex flex-wrap tab-pane">
            <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
                htmlFor="grid-first-name"
              >
                Pokemon:{" "}
              </label>
              <div className="relative flex w-full">
                <select
                  name="pokemon1"
                  className="appearance-none row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                 text-sm rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleChange(e, pokemons)}
                  value={equipo.pokemon1.id}
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
                  name="ataque_rapido1"
                  onChange={(e) => handleChange(e, rapidos)}
                  value={equipo.ataque_rapido1.id}
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
                  name="primer_cargado1"
                  onChange={(e) => handleChange(e, cargados)}
                  value={equipo.primer_cargado1.id}
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
                  name="segundo_cargado1"
                  onChange={(e) => handleChange(e, cargados)}
                  value={equipo.segundo_cargado1.id}
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
        )}
        {activeTab === "tab2" && (
          <div id="tab2" className="flex flex-wrap tab-pane">
            <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
                htmlFor="grid-first-name"
              >
                Pokemon:{" "}
              </label>
              <div className="relative flex w-full">
                <select
                  name="pokemon2"
                  className="appearance-none row-start-1 col-start-1 block w-full mt-2  border border-gray-200
                 text-sm rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleChange(e, pokemons)}
                  value={equipo.pokemon2.id}
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
                  name="ataque_rapido2"
                  onChange={(e) => handleChange(e, rapidos)}
                  value={equipo.ataque_rapido2.id}
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
                  name="primer_cargado2"
                  onChange={(e) => handleChange(e, cargados)}
                  value={equipo.primer_cargado2.id}
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
                  name="segundo_cargado2"
                  onChange={(e) => handleChange(e, cargados)}
                  value={equipo.segundo_cargado2.id}
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
        )}
        {activeTab === "tab3" && (
          <div id="tab3" className="flex flex-wrap tab-pane">
            <div className="w-full md:w-1/2 px-3 p-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs mb-2"
                htmlFor="grid-first-name"
              >
                Pokemon:{" "}
              </label>
              <div className="relative flex w-full">
                <select
                  name="pokemon3"
                  className="appearance-none row-start-1 col-start-1 block w-full mt-2  border border-gray-200
               text-sm rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleChange(e, pokemons)}
                  value={equipo.pokemon3.id}
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
                  name="ataque_rapido3"
                  onChange={(e) => handleChange(e, rapidos)}
                  value={equipo.ataque_rapido3.id}
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
                  name="primer_cargado3"
                  onChange={(e) => handleChange(e, cargados)}
                  value={equipo.primer_cargado3.id}
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
                  name="segundo_cargado3"
                  onChange={(e) => handleChange(e, cargados)}
                  value={equipo.segundo_cargado3.id}
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
        )}
      </div>
    </div>
  );
};
BodyModal.propTypes = {
  handleChange: PropTypes.func,
  equipo: PropTypes.object,
  pokemons: PropTypes.array,
  rapidos: PropTypes.array,
  cargados: PropTypes.array,
};
export default BodyModal;
