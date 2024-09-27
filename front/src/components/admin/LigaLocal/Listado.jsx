import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { MdDelete } from "react-icons/md";
import { FaSave, FaEdit, FaTimes } from "react-icons/fa";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import "./LigaLocal.css";
import {
  eliminarJugador,
  eliminarPokemon,
  handleCancelEdit,
  handleEdit,
  handleInputUpdate,
  handleSave,
} from "./functions";
import { IoEllipsisHorizontal } from "react-icons/io5";
import PropTypes from "prop-types";
import {
  PERMISO_ACTUALIZAR_COMPETIDOR_LOCAL,
  PERMISO_AGREGAR_POKEMON,
  PERMISO_ELIMINAR_COMPETIDOR_LOCAL,
  PERMISO_ELIMINAR_POKEMON,
} from "../../../utils/permisos";
import { useAuthorization } from "../../auth/AuthorizationProvider";

const Listado = ({ data, setData, sendRequest, openModal }) => {
  const [menuOpen, setMenuOpen] = useState(null);
  const { getPermiso } = useAuthorization();
  const handleMenuToggle = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div className="table-container">
      <Card>
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
                                  <Link
                                    href="#"
                                    className="hover:text-gray-400 font-medium"
                                  >
                                    <img
                                      src={pokemon.pokemon.img_url}
                                      alt={`imagen de: ${pokemon.pokemon.nombre}`}
                                    />
                                    {getPermiso(PERMISO_ELIMINAR_POKEMON) && (
                                      <button
                                        onClick={() =>
                                          eliminarPokemon(
                                            sendRequest,
                                            pokemon.id
                                          )
                                        }
                                      >
                                        <MdDelete />
                                      </button>
                                    )}
                                  </Link>
                                  <div className="flex flex-col bg-gradient-to-b from-sky-600 to-teal-400 w-60 h-auto rounded-md z-20 absolute right-0 invisible tooltip-item p-4 text-white">
                                    <strong className="uppercase pb-1">
                                      {pokemon.pokemon.nombre}
                                    </strong>
                                    <span>
                                      Ataque basico:{" "}
                                      {pokemon.ataque_rapido.nombre_la}
                                    </span>
                                    <span>
                                      Ataques cargados:{" "}
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
                          {getPermiso(PERMISO_ACTUALIZAR_COMPETIDOR_LOCAL) && (
                            <button
                              onClick={() =>
                                handleSave(
                                  data,
                                  sendRequest,
                                  reg.id,
                                  "competidores"
                                )
                              }
                            >
                              <FaSave /> Guardar
                            </button>
                          )}
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
                        <div>
                          <button
                            onClick={() => handleMenuToggle(reg.id)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <IoEllipsisHorizontal size={24} />
                          </button>
                          {menuOpen === reg.id && (
                            <div className="menu absolute justify-items-center rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ">
                              {getPermiso(PERMISO_AGREGAR_POKEMON) && (
                                <button
                                  className="menu-item flex items-center p-3  text-md w-full hover:bg-gray-100"
                                  onClick={() => openModal(reg.id)}
                                >
                                  <FaSave className="text-xl" />
                                  <p className="pl-3">Agregar Pokemon</p>
                                </button>
                              )}
                              {getPermiso(
                                PERMISO_ACTUALIZAR_COMPETIDOR_LOCAL
                              ) && (
                                <button
                                  className="menu-item flex items-center p-3  text-md w-full hover:bg-gray-100"
                                  onClick={() =>
                                    handleEdit(
                                      data,
                                      setData,
                                      reg.id,
                                      "competidores"
                                    )
                                  }
                                >
                                  <FaEdit className="text-xl" />
                                  <p className="pl-3  text-center">Editar</p>
                                </button>
                              )}
                              {getPermiso(
                                PERMISO_ELIMINAR_COMPETIDOR_LOCAL
                              ) && (
                                <button
                                  className="menu-item flex items-center p-3  text-md w-full hover:bg-gray-100"
                                  onClick={() =>
                                    eliminarJugador(sendRequest, reg.id)
                                  }
                                >
                                  <MdDelete className="text-xl" />
                                  <p className="pl-3  text-center">
                                    Eliminar Competidor
                                  </p>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

Listado.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func,
  sendRequest: PropTypes.func,
  openModal: PropTypes.func,
};

export default Listado;
