import PropTypes from "prop-types";
import { useState } from "react";
import { EquipoTop } from "../models/models";
import { SlArrowDown } from "react-icons/sl";
import BodyModal from "./BodyModal";

const EquipoModal = ({
  isVisible,
  onClose,
  pokemons,
  ligas,
  rapidos,
  cargados,
}) => {
  /** hooks */
  const [equipo, setEquipo] = useState(EquipoTop);
  /**funciones */
  /** validacion */
  if (!isVisible) return null;
  const handleChange = (e, catalogo) => {
    const { name, value } = e.target;
    if (value === "") {
      setEquipo({ ...equipo, [name]: {} });
    } else {
      const po = catalogo.find((p) => {
        if (p.id == value) {
          return p;
        }
      });
      setEquipo({ ...equipo, [name]: po });
    }
  };
  /** render */
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="relative flex w-full">
          <h1 className="text-xl	text-gray-400 	">Agrega Equipo Top</h1>
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
              Seleccione la liga:{" "}
            </label>
            <div className="relative flex w-full">
              <select
                className="appearance-none text-sm row-start-1 col-start-1 block w-full mt-2  border border-gray-200
              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="liga"
                onChange={(e) => handleChange(e, ligas)}
                value={equipo.liga.id}
              >
                <option value="">Selecciona liga</option>
                {ligas.map((liga) => (
                  <option key={liga.id} value={liga.id}>
                    {liga.nombre}
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
              Posición:{" "}
            </label>
            <div className="relative flex w-full">
              <input
                type="number"
                className="appearance-none text-sm row-start-1 col-start-1 block w-full mt-2  border border-gray-200
              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="liga"
                onChange={(e) =>
                  setEquipo({ ...equipo, posicion: parseInt(e.target.value) })
                }
                value={equipo.posicion}
              />
            </div>
          </div>
        </div>
        <hr className="h-px my-3 bg-gray-200 border-0 " />
        <BodyModal
          handleChange={handleChange}
          equipo={equipo}
          pokemons={pokemons}
          rapidos={rapidos}
          cargados={cargados}
        />
        <div>
          <button
            className="border-1 rounded-md bg-blue-950 p-2  hover:bg-blue-600 text-white"
            onClick={() => console.log(equipo)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
EquipoModal.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  pokemons: PropTypes.array,
  ligas: PropTypes.array,
  rapidos: PropTypes.array,
  cargados: PropTypes.array,
};
export default EquipoModal;
