import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import useAxiosBack from "../../../hooks/useAxiosBack";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { JugadorTop } from "../models/models";
import {
  closeLoadingAlert,
  showConfirmationAlert,
  showErrorAlert,
  showLoadingAlert,
} from "../../../utils/alertUtils";
import {
  ELIMINAR_JUGADOR_TOP,
  GET_TOP_MUNDIAL,
  GUARDAR_JUGADOR_TOP,
  LOGIN,
  UPDATE_JUGADOR_TOP,
} from "../../../utils/urls";
import { getPermiso, isTokenExpired } from "../../auth/helpers";
import {
  PERMISO_ACTUALIZAR_JUGADOR_TOP,
  PERMISO_ELIMINAR_JUGADOR_TOP,
  PERMISO_GUARDAR_JUGADOR_TOP,
  VER_ADMIN_RANKING_MUNDIAL,
} from "../../../utils/permisos";
import { useNavigate } from "react-router-dom";
/**
 * @returns Componte para la edición de jugadores top
 */
export const RankingMundialAdmin = () => {
  /** hooks */
  const [jugador, setJugador] = useState(JugadorTop);
  const { data, setData, error, loading, sendRequest } = useAxiosBack();
  const navigate = useNavigate();
  /** useEffect */
  useEffect(() => {
    if (isTokenExpired()) {
      localStorage.removeItem("token");
      navigate(LOGIN);
    }
    if (!getPermiso(VER_ADMIN_RANKING_MUNDIAL)) {
      navigate("/");
    }
    sendRequest("GET", GET_TOP_MUNDIAL);
  }, []);
  /**sweet alert para la carga de datos */
  useEffect(() => {
    if (loading.data) {
      showLoadingAlert();
    } else {
      closeLoadingAlert();
    }
  }, [loading.data]);

  useEffect(() => {
    const message = error?.data?.message;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${message}`);
      }, 200);
    }
  }, [error]);

  /** functions */
  /**
   * funcion que permite registrar jugadores top
   */
  const onSave = async () => {
    /**guardado de la info */
    await sendRequest("POST", GUARDAR_JUGADOR_TOP, jugador);
    /**recarga de la info */
    await sendRequest("GET", GET_TOP_MUNDIAL);
    /**limpiar jugadorTop */
    setJugador(JugadorTop);
  };
  /** función para actualizar campos */
  const actualizaCampo = (campo, valor) => {
    setJugador((prevJugador) => ({
      ...prevJugador,
      [campo]: valor,
    }));
  };

  const handleEditChange = (key, id, campo, valor) => {
    setData((prevData) => {
      const newData = { ...prevData };
      if (newData[key]) {
        newData[key] = newData[key].map((reg) =>
          reg.id === id ? { ...reg, [campo]: valor } : reg
        );
      }
      return newData;
    });
  };

  /** función para guardar cambios de registros */
  const actualizarJugador = async (id) => {
    const updatedRecord = data?.data?.find((reg) => reg.id === id);
    await sendRequest("PUT", UPDATE_JUGADOR_TOP, updatedRecord);
    sendRequest("GET", GET_TOP_MUNDIAL);
  };
  /**
   * Método para eliminar un registro
   * @param {int} id id del registro a eliminar
   */
  const eliminarJugadorTop = async (id) => {
    const eliminar = showConfirmationAlert(
      "¿Realmente desea eliminar el registro?"
    );
    if ((await eliminar).isConfirmed) {
      await sendRequest("DELETE", ELIMINAR_JUGADOR_TOP + id);
      sendRequest("GET", GET_TOP_MUNDIAL);
    }
  };

  /** render */
  return (
    <div className="p-8 items-center">
      <div>
        <h1 className="text-3xl font-semibold pb-5 text-center">
          Agregar jugador top
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="w-full px-3">
            <label htmlFor="grid-name">Nombre jugador: </label>
            <input
              min="0"
              className="appearance-none block w-full mt-2 border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Jane"
              onChange={(e) => actualizaCampo("nombre_jugador", e.target.value)}
              value={jugador?.nombre_jugador}
            />
          </div>
          <div className="w-full px-3 pt-3">
            <label htmlFor="grid-team">
              Equipo insignia:{" "}
              <select
                className="appearance-none block w-full mt-2  border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={jugador.equipo_insignia} // ...fuerza al valor del select a coincidir con la variable de estado,...
                onChange={(e) =>
                  actualizaCampo("equipo_insignia", e.target.value)
                } // ...¡y a actualizar la variable de estado con cualquier cambio!
              >
                <option value="instinto">Instinto</option>
                <option value="valor">Valor</option>
                <option value="sabiduria">Sabiduria</option>
              </select>
            </label>
          </div>
          <div className="w-full px-3 pt-3">
            <label htmlFor="grid-points" />
            Puntos totales:{" "}
            <input
              type="number"
              className="appearance-none block w-full mt-2  border border-gray-200
                rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={(e) =>
                actualizaCampo(
                  "puntos_totales",
                  parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value)
                )
              }
              value={jugador?.puntos_totales}
            />
          </div>
          {getPermiso(PERMISO_GUARDAR_JUGADOR_TOP) && (
            <button
              className="mx-3 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onSave}
            >
              Guardar
            </button>
          )}
        </div>
      </div>
      <div className="table-container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error.data != null ? <div>{error?.message}</div> : null}
        <Table className="min-w-full leading-normal">
          <TableHead className="bg-light border border-1">
            <TableRow>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Jugador
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Equipo
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Puntos
              </TableHeaderCell>
              <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                Opciones
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data.data)
              ? (data.data || []).map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <input
                        value={reg?.nombre_jugador}
                        type="text"
                        onChange={(e) =>
                          handleEditChange(
                            "data",
                            reg.id,
                            "nombre_jugador",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <select
                        value={reg?.equipo_insignia}
                        onChange={(e) =>
                          handleEditChange(
                            "data",
                            reg.id,
                            "equipo_insignia",
                            e.target.value
                          )
                        }
                      >
                        <option value="instinto">Instinto</option>
                        <option value="valor">Valor</option>
                        <option value="sabiduria">Sabiduria</option>
                      </select>
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <input
                        value={reg?.puntos_totales}
                        type="number"
                        onChange={(e) =>
                          handleEditChange(
                            "data",
                            reg.id,
                            "puntos_totales",
                            parseInt(e.target.value) <= 0
                              ? 0
                              : parseInt(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {getPermiso(PERMISO_ACTUALIZAR_JUGADOR_TOP) && (
                        <button onClick={() => actualizarJugador(reg.id)}>
                          <FaSave />
                        </button>
                      )}
                      {getPermiso(PERMISO_ELIMINAR_JUGADOR_TOP) && (
                        <button onClick={() => eliminarJugadorTop(reg.id)}>
                          <MdDelete />
                        </button>
                      )}
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
