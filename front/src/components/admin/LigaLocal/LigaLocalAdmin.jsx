import { Fragment, useEffect, useState } from "react";
import useAxiosBack from "../../../hooks/useAxiosBack";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { CompetidorModel } from "../models/models";
import AgregarPokemonModal from "./AgregarPokemonModal";

const LigaLocalAdmin = () => {
  const { data, sendRequest } = useAxiosBack();
  const [newCompetidor, setNewCompetidor] = useState(CompetidorModel);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regId,setRegId]=useState(null);

  const openModal = (id) => {
    console.log('el registro es:',id);
    setRegId(id);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  //catalogos
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
  /** funciones */
  const handleInputChange = (e, catalogo) => {
    const { name, value } = e.target;
    if(name=="equipo_insignia"){
      const po=catalogo.find(p=>{
        if (p.id==value){
          return p;
        }
      })
      setNewCompetidor((prev) => ({
        ...prev,
        [name]: po,
      }));
    }else{
      setNewCompetidor((prev) => ({
        ...prev,
        [name]: name == "puntos" ? parseInt(value) : value,
      }));
    }
   
  };
  const agregarJugador = async () => {
    await sendRequest(
      "POST",
      "/registrarCompetidor",
      newCompetidor,
      "addCompetidor"
    );
    await sendRequest("GET", "/getLigaLocal", {}, "competidores");
  };
  /**render */
  return (
    <div>
      LigaLocalAdmin
      <div className="d-flex center">
        <h1>Competidores de liga local</h1>
      </div>
      <div>
        <label>
          Nombre:{" "}
          <input
            type="text"
            name="nombre"
            value={newCompetidor.nombre}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Equipo Insignia:{" "}
          <select
            name="equipo_insignia"
            value={newCompetidor.equipo_insignia.id}
            onChange={e=>handleInputChange(e, data.liga.EquipoInsignia)}
          >
            {data?.liga?.EquipoInsignia?.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Puntos Iniciales:{" "}
          <input
            type="number"
            name="puntos"
            min={0}
            value={newCompetidor.puntos}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={agregarJugador}>Guardar competidor</button>
      </div>
      <div>
        <Table className="min-w-full leading-normal">
          <TableHead className="bg-light border border-1">
            <TableRow>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Jugador
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Equipo Insignia
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Puntos
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Equipo Pokemon
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Opciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data.competidores)
              ? (data.competidores || []).map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {reg.nombre}
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {reg.equipo?.nombre}
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {reg.puntos}
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">                               
                      {Array.isArray(reg?.equipo_competidores)
                        ? (reg.equipo_competidores || []).map((pokemon) => (
                            <Fragment key={pokemon?.id}>
                              <div className="justify-content-between">
                                <div className="relative inline-block tooltip  my-1 ">
                                  <a
                                    to=""
                                    className="hover:text-gray-400 font-medium"
                                  >
                                    <img
                                      src={pokemon?.pokemon?.img_url}
                                      alt={
                                        `imagen de:` + pokemon?.pokemon?.nombre
                                      }
                                    />
                                  </a>
                                  <div className="flex flex-col bg-orange-500 w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item pl-4">
                                    <strong>{pokemon?.pokemon?.nombre}</strong>
                                    <span className="mt-4">
                                      ataque basico:{" "}
                                      {pokemon?.ataque_rapido.nombre_la}
                                    </span>
                                    <br />
                                    <span className="mb-4">
                                      ataques cargados:{" "}
                                      {pokemon?.primer_ataque_cargado.nombre_la}
                                      ,{" "}
                                      {
                                        pokemon?.segundo_ataque_cargado
                                          .nombre_la
                                      }
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ))
                        : null}
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {/* Aquí puedes añadir opciones como editar/eliminar */}
                      <button onClick={() => openModal(reg.id)}>
                        <FaSave /> Agregar Pokemon
                      </button>
                      <button onClick={() => console.log('eliminar')}>
                        <MdDelete /> Eliminar Competidor
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      <AgregarPokemonModal isOpen={isModalOpen} 
                          onClose={closeModal} 
                          competidorId={regId} 
                          pokemons={data.pokes}
                          ligas={data?.liga?.Liga}
                          rapidos={data.rapidos}
                          cargados={data.cargados}
                          sendRequest={sendRequest}/>
    </div>
  );
};

export default LigaLocalAdmin;
