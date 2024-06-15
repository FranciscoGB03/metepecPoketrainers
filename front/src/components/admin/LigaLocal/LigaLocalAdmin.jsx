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
import { IoIosAddCircleOutline } from "react-icons/io";
import { CompetidorModel } from "../models/models";

const LigaLocalAdmin = () => {
  const { data, sendRequest } = useAxiosBack();
  const [newCompetidor, setNewCompetidor] = useState(CompetidorModel);

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompetidor((prev) => ({
      ...prev,
      [name]: name=='puntos'||name=='equipo_id'?parseInt(value):value,
    }));
  };
  const agregarJugador = async () => {
    await sendRequest('POST', '/registrarCompetidor', newCompetidor, 'addCompetidor');
    await sendRequest('GET', '/getLigaLocal', {}, 'competidores');
  };
  /**render */
  return (
    <div>
      LigaLocalAdmin
      <div className="d-flex center">
        <h1>Competidores de liga local</h1>
        <button onClick={agregarJugador}>
          <IoIosAddCircleOutline /> Agregar jugador
        </button>
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
            name="equipo_id"
            value={newCompetidor.equipo_id}
            onChange={handleInputChange}
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
        <label>
          Pokemon:{" "}
          <select
            name="equipo_pokemon"
            //value={newCompetidor.equipo_pokemon}
            //onChange={handleInputChange}
          >
            {data?.pokes?.map((poke) => (
              <option key={poke.id} value={poke.id}>
                {poke.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Liga:{" "}
          <select
            name="liga_id"
            //value={newCompetidor.liga_id}
            //onChange={handleInputChange}
          >
            {data?.liga?.Liga?.map((liga) => (
              <option key={liga.id} value={liga.id}>
                {liga.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ataque rápido:{" "}
          <select
            name="ataque_rapido_id"
            //value={newCompetidor.liga_id}
            //onChange={handleInputChange}
          >
            {data?.rapidos?.map((rapido) => (
              <option key={rapido.id} value={rapido.id}>
                {rapido.nombre_es}
              </option>
            ))}
          </select>
        </label>
        <label>
          Primer ataque cargado:{" "}
          <select
            name="primer_ataque_cargado"
            //value={newCompetidor.liga_id}
            //onChange={handleInputChange}
          >
            {data?.cargados?.map((cargado) => (
              <option key={cargado.id} value={cargado.id}>
                {cargado.nombre_es}
              </option>
            ))}
          </select>
        </label>
        <label>
          Segundo ataque cargado:{" "}
          <select
            name="segundo_ataque_cargado"
            //value={newCompetidor.liga_id}
            //onChange={handleInputChange}
          >
            {data?.cargados?.map((cargado) => (
              <option key={cargado.id} value={cargado.id}>
                {cargado.nombre_es}
              </option>
            ))}
          </select>
        </label>
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
                    {Array.isArray(reg?.equipo_competidores)?
                          (reg.equipo_competidores || []).map(pokemon=>
                          <Fragment key={pokemon?.id}>
                          <div className="justify-content-between">
                            <div className="relative inline-block tooltip  my-1 ">
                             <a to="" className="hover:text-gray-400 font-medium">
                             
                              <img src={pokemon?.pokemon?.img_url} alt={`imagen de:`+pokemon?.pokemon?.nombre}/>
                            </a>
                              <div className="flex flex-col bg-orange-500 w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item pl-4">
                              <strong>{pokemon?.pokemon?.nombre}</strong>
                                <span className="mt-4">ataque basico: {pokemon?.ataque_rapido.nombre_la}</span><br/>
                                <span className="mb-4">ataques cargados: {pokemon?.primer_ataque_cargado.nombre_la}, {pokemon?.segundo_ataque_cargado.nombre_la}</span>                                
                              </div>
                            </div>
                          </div>
                          </Fragment>
                          ):null}    
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {/* Aquí puedes añadir opciones como editar/eliminar */}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LigaLocalAdmin;
