import { useState } from "react";
import PropTypes from "prop-types";
import FormularioTab from "./FormularioTab";

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
          <FormularioTab
            tab="tab1"
            equipo={equipo}
            pokemon="pokemon1"
            rapido="ataque_rapido1"
            cargado1="primer_cargado1"
            cargado2="segundo_cargado1"
            handleChange={handleChange}
            pokemons={pokemons}
            rapidos={rapidos}
            cargados={cargados}
          />
        )}
        {activeTab === "tab2" && (
          <FormularioTab
            tab="tab2"
            equipo={equipo}
            pokemon="pokemon2"
            rapido="ataque_rapido2"
            cargado1="primer_cargado2"
            cargado2="segundo_cargado2"
            handleChange={handleChange}
            pokemons={pokemons}
            rapidos={rapidos}
            cargados={cargados}
          />
        )}
        {activeTab === "tab3" && (
          <FormularioTab
            tab="tab3"
            equipo={equipo}
            pokemon="pokemon3"
            rapido="ataque_rapido3"
            cargado1="primer_cargado3"
            cargado2="segundo_cargado3"
            handleChange={handleChange}
            pokemons={pokemons}
            rapidos={rapidos}
            cargados={cargados}
          />
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
