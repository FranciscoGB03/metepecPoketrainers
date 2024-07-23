import { useEffect, useState } from "react";
import useAxiosBack from "../../../hooks/useAxiosBack";

import { CompetidorModel } from "../models/models";
import AgregarPokemonModal from "./AgregarPokemonModal";
import { showErrorAlert } from "../../../utils/alertUtils";
import { agregarJugador, handleInputChange } from "./functions";
import Listado from "./Listado";
import { getUID } from "../../auth/helpers";
import { FaChevronDown } from "react-icons/fa";

const LigaLocalAdmin = () => {
  /**hooks */
  const { data, setData, error, sendRequest } = useAxiosBack();
  const [newCompetidor, setNewCompetidor] = useState(CompetidorModel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regId, setRegId] = useState(null);
  //useEffect
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", "/getCatalogosLigaEquipos", {}, "liga");
      await sendRequest("GET", "/getPokemons", {}, "pokes");
      await sendRequest("GET", "/getLigaLocal", {}, "competidores");
      await sendRequest("GET", "/getAtaquesRapidos", {}, "rapidos");
      await sendRequest("GET", "/getAtaquesCargados", {}, "cargados");
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (newCompetidor.user_id === 0) {
      setNewCompetidor({
        ...newCompetidor,
        user_id: getUID() == 1 ? 2 : getUID,
      });
    }
  }, [newCompetidor]);
  useEffect(() => {
    const message =
      error?.addPokemon?.message ||
      error?.addCompetidor?.message ||
      error?.competidor?.message ||
      error?.actualizaCompetidor?.message ||
      error?.eliminaPoke?.message;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${message}`);
      }, 200);
    }
  }, [error]);
  /** funciones */
  const openModal = (id) => {
    setRegId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  /**render */
  return (
    <div className="p-8 items-center">
      <h1 className="text-3xl font-semibold pb-5 text-center">
        LigaLocalAdmin
      </h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex"> 
        <h1 className="text-left text-2xl font-semibold pb-5 ">
          Competidores de liga local
        </h1>
        <div className="text-right pt-3 align-bottom justify-end"><FaChevronDown/></div>
        </div>
        <div>
          <div className="w-full px-3">
            <label htmlFor="grid-name">
              Nombre:{" "}
              <input
                type="text"
                className="appearance-none block w-full mt-2 border border-gray-200
                  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="nombre"
                value={newCompetidor.nombre}
                onChange={(e) => handleInputChange(e, setNewCompetidor)}
              />
            </label>
          </div>
          <div className="w-full px-3 pt-3">
            <label htmlFor="grid-team">
              Equipo Insignia:{" "}
              <select
                className="appearance-none block w-full mt-2  border border-gray-200
          rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="equipo_insignia"
                value={newCompetidor.equipo_insignia.id}
                onChange={(e) =>
                  handleInputChange(e, setNewCompetidor, data.liga.EquipoInsignia)
                }
              >
                {data?.liga?.EquipoInsignia?.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>
                    {equipo.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="w-full px-3 pt-3">
            <label htmlFor="puntos" >Puntos totales:{" "}</label>
            <input

              type="number"
              name="puntos"
              min={0}
              value={newCompetidor.puntos}
              className="appearance-none block w-full mt-2  border border-gray-200
        rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) => handleInputChange(e, setNewCompetidor)}
            />
          </div>
          <button
            className="mx-3 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              agregarJugador(sendRequest, newCompetidor, setNewCompetidor)
            }
          >
            Guardar
          </button>
        </div>
      </div>
      <div>
        <Listado
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          data={data}
          setData={setData}
          openModal={openModal}
          sendRequest={sendRequest}
        />
      </div>
      <AgregarPokemonModal
        isOpen={isModalOpen}
        onClose={closeModal}
        competidorId={regId}
        pokemons={data.pokes}
        ligas={data?.liga?.Liga}
        rapidos={data.rapidos}
        cargados={data.cargados}
        sendRequest={sendRequest}
      />
    </div>
  );
};

export default LigaLocalAdmin;
