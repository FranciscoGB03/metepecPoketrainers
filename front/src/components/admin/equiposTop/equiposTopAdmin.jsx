import { useEffect, useState } from "react";
import "./styles.css";
import useAxiosBack from "../../../hooks/useAxiosBack";
import Tooltip from "../../../utils/Tooltip";

const EquiposTopAdmin = () => {
  const [ligaSuper, setLigaSuper] = useState([]);
  const [ligaUltra, setLigaUltra] = useState([]);
  const [ligaMaster, setLigaMaster] = useState([]);
  const { data, setData, error, sendRequest } = useAxiosBack();

  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", "/getEquiposTop", {}, "equipos");
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLigaSuper(data.equipos.filter((equipo) => equipo.liga.id === 1));
    setLigaUltra(data.equipos.filter((equipo) => equipo.liga.id === 2));
    setLigaMaster(data.equipos.filter((equipo) => equipo.liga.id === 3));
  }, [data]);

  const onHandleClick = () => {
    alert("hola");
  };
  return (
    <div id="team-container" className="gap-2 p-2 h-screen">
      <header className="[grid-area:header] p-2">
        <h1 className="text-2xl  font-bold text-center p-0">Equipos Top</h1>
      </header>
      <div className="[grid-area:super] flex flex-col min-w-full">
        <div className="border rounded-md border-blue-400 flex flex-col overflow-y-auto max-h-screen">
          <div className="bg-cyan-950 p-2 flex justify-center">
            <h2 className="uppercase text-xl text-center text-white mr-2">
              Liga Super
            </h2>
            <Tooltip header="Agregar Equipo" position="rigth">
              <button
                className="border border-white mt-1 w-6 h-6 text-white rounded-full flex items-center justify-center hover:bg-cyan-800"
                onClick={onHandleClick}
              >
                <p className="mb-1 text-2xl font-bold">+</p>
              </button>
            </Tooltip>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gradient-to-r from-cyan-600 to-cyan-900 text-white text-xl font-bold">
                <tr>
                  <th>#</th>
                  <th>Pokemon 1</th>
                  <th>Pokemon 2</th>
                  <th>Pokemon 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(ligaSuper || []).map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <span className="text-lg font-serif text-cyan-700">
                        {reg.posicion}
                      </span>
                    </td>
                    <td>
                      <Tooltip
                        position="left"
                        header={
                          <div className="flex flex-col">
                            <strong className="uppercase pb-1">
                              {reg.pokemon1.nombre}
                            </strong>
                            <span>
                              Ataque basico: {reg.ataque_rapido1?.nombre_la}
                            </span>
                            <span>
                              Ataques cargados: {reg.primer_cargado1?.nombre_la}
                              , {reg.segundo_cargado1?.nombre_la}
                            </span>
                          </div>
                        }
                      >
                        <img
                          src={reg.pokemon1.img_url}
                          alt={reg.pokemon1.nombre}
                        />
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        position="center"
                        header={
                          <div className="flex flex-col">
                            <strong className="uppercase pb-1">
                              {reg.pokemon2.nombre}
                            </strong>
                            <span>
                              Ataque basico: {reg.ataque_rapido2?.nombre_la}
                            </span>
                            <span>
                              Ataques cargados: {reg.primer_cargado2?.nombre_la}
                              , {reg.segundo_cargado2?.nombre_la}
                            </span>
                          </div>
                        }
                      >
                        <img
                          src={reg.pokemon2.img_url}
                          alt={reg.pokemon2.nombre}
                        />
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        position="right"
                        header={
                          <div className="flex flex-col">
                            <strong className="uppercase pb-1">
                              {reg.pokemon3.nombre}
                            </strong>
                            <span>
                              Ataque basico: {reg.ataque_rapido3?.nombre_la}
                            </span>
                            <span>
                              Ataques cargados: {reg.primer_cargado3?.nombre_la}
                              , {reg.segundo_cargado3?.nombre_la}
                            </span>
                          </div>
                        }
                      >
                        <img
                          src={reg.pokemon3.img_url}
                          alt={reg.pokemon3.nombre}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="[grid-area:ultra] min-w-full">
        <div className="border rounded-md border-blue-400 flex flex-col overflow-y-auto max-h-screen">
          <div className="bg-cyan-950 p-2 flex justify-center">
            <h2 className="uppercase text-xl text-center text-white mr-2">
              Liga ultra
            </h2>
            <Tooltip header="Agregar Equipo" position="rigth">
              <button
                className="border border-white mt-1 w-6 h-6 text-white rounded-full flex items-center justify-center hover:bg-cyan-800"
                onClick={onHandleClick}
              >
                <p className="mb-1 text-2xl font-bold">+</p>
              </button>
            </Tooltip>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="sticky top-0 bg-gradient-to-r from-cyan-600 to-cyan-900 text-white text-xl font-bold">
                <tr>
                  <th>#</th>
                  <th>Pokemon 1</th>
                  <th>Pokemon 2</th>
                  <th>Pokemon 3</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(ligaUltra || []).map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <span className="text-lg font-serif text-cyan-700">
                        {reg.posicion}
                      </span>
                    </td>
                    <td>
                      <Tooltip
                        position="left"
                        header={
                          <div className="flex flex-col">
                            <strong className="uppercase pb-1">
                              {reg.pokemon1.nombre}
                            </strong>
                            <span>
                              Ataque basico: {reg.ataque_rapido1?.nombre_la}
                            </span>
                            <span>
                              Ataques cargados: {reg.primer_cargado1?.nombre_la}
                              , {reg.segundo_cargado1?.nombre_la}
                            </span>
                          </div>
                        }
                      >
                        <img
                          src={reg.pokemon1.img_url}
                          alt={reg.pokemon1.nombre}
                        />
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        position="center"
                        header={
                          <div className="flex flex-col">
                            <strong className="uppercase pb-1">
                              {reg.pokemon2.nombre}
                            </strong>
                            <span>
                              Ataque basico: {reg.ataque_rapido2?.nombre_la}
                            </span>
                            <span>
                              Ataques cargados: {reg.primer_cargado2?.nombre_la}
                              , {reg.segundo_cargado2?.nombre_la}
                            </span>
                          </div>
                        }
                      >
                        <img
                          src={reg.pokemon2.img_url}
                          alt={reg.pokemon2.nombre}
                        />
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        position="right"
                        header={
                          <div className="flex flex-col">
                            <strong className="uppercase pb-1">
                              {reg.pokemon3.nombre}
                            </strong>
                            <span>
                              Ataque basico: {reg.ataque_rapido3?.nombre_la}
                            </span>
                            <span>
                              Ataques cargados: {reg.primer_cargado3?.nombre_la}
                              , {reg.segundo_cargado3?.nombre_la}
                            </span>
                          </div>
                        }
                      >
                        <img
                          src={reg.pokemon3.img_url}
                          alt={reg.pokemon3.nombre}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="[grid-area:master] flex-col min-w-full"></div>
    </div>
  );
};

export default EquiposTopAdmin;
