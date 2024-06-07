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

/**
 * @returns Componte para la edición de jugadores top
 */
export const RankingMundialAdmin = () => {
  /** hooks */
  const [jugador, setJugador] = useState(JugadorTop);
  const { data, setData, error, loading, sendRequest } = useAxiosBack();
  /** useEffect */
  useEffect(() => {sendRequest("GET","/getTopMundial");}, []);

  /** functions */
  /**
   * funcion que permite registrar jugadores top
   */
  const onSave = async () => {
    /**guardado de la info */
    await sendRequest("POST","/guardarJugador", jugador);
    /**recarga de la info */
    await sendRequest("GET","/getTopMundial");
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
/** función para actualizar registros editados */
const handleEditChange = (id, campo, valor) => {
    setData((prevData) =>
      prevData.map((reg) =>
        reg.id === id ? { ...reg, [campo]: valor } : reg
      )
    );
  };

  /** función para guardar cambios de registros */
  const actualizarJugador = async (id) => {
    const updatedRecord = data?.find((reg) => reg.id === id);
    await sendRequest("PUT","/updateJugadorTop", updatedRecord);
    sendRequest("GET","/getTopMundial");
  };
  /**
   * Método para eliminar un registro
   * @param {int} id id del registro a eliminar
   */
  const eliminarJugadorTop= async (id)=>{
    await sendRequest("DELETE","/eliminarJugadorTop/"+id);
    sendRequest("GET","/getTopMundial");
  }

  /** render */
  return (
    <div>
      <div>
        <h3>Agregar jugador top</h3>
        <div>
          <label>
            Nombre jugador:{" "}
            <input
              min="0"
              onChange={(e) => actualizaCampo("nombre_jugador", e.target.value)}
              value={jugador?.nombre_jugador}
            />
          </label>
        </div>
        <div>
          <label>
            Equipo insignia:{" "}
            <select
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
        <div>
          <label>
            Puntos totales:{" "}
            <input
              type="number"
              onChange={(e) =>
                actualizaCampo(
                  "puntos_totales",
                  parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value)
                )
              }
              value={jugador?.puntos_totales}
            />
          </label>
        </div>
        <button onClick={onSave}>Guardar</button>
      </div>
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        {loading ? <div>Cargando...</div> : null}
        {error != null ? <div>{error?.message}</div> : null}
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
            {Array.isArray(data) ?(data||[]).map((reg) => (
              <TableRow key={reg.id}>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <input
                    value={reg?.nombre_jugador}
                    type="text"
                    onChange={(e) =>
                      handleEditChange(reg.id, "nombre_jugador", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <select
                    value={reg?.equipo_insignia}
                    onChange={(e) =>
                      handleEditChange(reg.id, "equipo_insignia", e.target.value)
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
                  <button onClick={() => actualizarJugador(reg.id)}><FaSave /></button>
                  <button onClick={() => eliminarJugadorTop(reg.id)}><MdDelete /></button>
                </TableCell>
              </TableRow>
            )):null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
