import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { MdDelete } from "react-icons/md";
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { Fragment } from "react";
import {
  eliminarJugador,
  eliminarPokemon,
  handleCancelEdit,
  handleEdit,
  handleInputUpdate,
  handleSave,
} from "./functions";
import PropTypes from "prop-types";

const Listado = ({ data, setData, sendRequest, openModal }) => {
  /** render */
  return (
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
          ? data.competidores.map((reg) => (
              <TableRow key={reg.id}>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {reg.editing ? (
                    <input
                      type="text"
                      value={reg?.nombre}
                      onChange={(e) =>
                        handleInputUpdate(
                          data,
                          setData,
                          "competidores",
                          reg?.id,
                          "nombre",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    reg.nombre
                  )}
                </TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {reg.editing ? (
                    <select
                      name="equipo_insignia"
                      value={reg.equipo_insignia.id}
                      onChange={(e) =>
                        handleInputUpdate(
                          data,
                          setData,
                          "competidores",
                          reg.id,
                          "equipo_insignia",
                          e.target.value,
                          data.liga.EquipoInsignia
                        )
                      }
                    >
                      {data?.liga?.EquipoInsignia?.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                          {equipo.nombre}
                        </option>
                      ))}
                    </select>
                  ) : (
                    reg.equipo_insignia?.nombre
                  )}
                </TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {reg.editing ? (
                    <input
                      type="number"
                      value={reg.puntos}
                      onChange={(e) =>
                        handleInputUpdate(
                          data,
                          setData,
                          "competidores",
                          reg.id,
                          "puntos",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  ) : (
                    reg.puntos
                  )}
                </TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {Array.isArray(reg.equipo_competidores)
                    ? reg.equipo_competidores.map((pokemon) => (
                        <Fragment key={pokemon.id}>
                          <div className="justify-content-between">
                            <div className="relative inline-block tooltip  my-1 ">
                              <a
                                href="#"
                                className="hover:text-gray-400 font-medium"
                              >
                                <img
                                  src={pokemon.pokemon.img_url}
                                  alt={`imagen de: ${pokemon.pokemon.nombre}`}
                                />
                                <button
                                  onClick={() =>
                                    eliminarPokemon(sendRequest, pokemon.id)
                                  }
                                >
                                  <MdDelete />
                                </button>
                              </a>
                              <div className="flex flex-col bg-orange-500 w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item pl-4">
                                <strong>{pokemon.pokemon.nombre}</strong>
                                <span className="mt-4">
                                  ataque basico:{" "}
                                  {pokemon.ataque_rapido.nombre_la}
                                </span>
                                <br />
                                <span className="mb-4">
                                  ataques cargados:{" "}
                                  {pokemon.primer_ataque_cargado.nombre_la},{" "}
                                  {pokemon.segundo_ataque_cargado.nombre_la}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      ))
                    : null}
                </TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {reg.editing ? (
                    <>
                      <button
                        onClick={() =>
                          handleSave(data, sendRequest, reg.id, "competidores")
                        }
                      >
                        <FaSave /> Guardar
                      </button>
                      <button
                        onClick={() =>
                          handleCancelEdit(
                            data,
                            setData,
                            reg.id,
                            "competidores"
                          )
                        }
                      >
                        <FaTimes /> Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled={
                          reg?.equipo_competidores &&
                          reg.equipo_competidores.length >= 6
                        }
                        onClick={() => openModal(reg.id)}
                      >
                        <FaSave /> Agregar Pokemon
                      </button>
                      <button
                        onClick={() =>
                          handleEdit(data, setData, reg.id, "competidores")
                        }
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        onClick={() => eliminarJugador(sendRequest, reg.id)}
                      >
                        <MdDelete /> Eliminar Competidor
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

Listado.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  sendRequest: PropTypes.func,
  openModal: PropTypes.func,
};

export default Listado;
