import { useEffect, useState } from "react";
import useAxiosBack from "../../../../hooks/useAxiosBack";
import {
  showConfirmationAlert,
  showErrorAlert,
} from "../../../../utils/alertUtils";
import { ROL } from "../../models/models";
import {
  ADD_ROL,
  DELETE_ROL,
  GET_ALL_ROLES,
  UPDATE_ROL,
} from "../../../../utils/urls";
import { MdDelete, MdEdit } from "react-icons/md";

export const Rol = () => {
  /**hooks */
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState(ROL);
  const { data, error, sendRequest } = useAxiosBack();
  /** useEffects */
  /** inicial */
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", GET_ALL_ROLES, {}, "roles");
    };
    fetchData();
  }, []);
  /** validacion de datos */
  useEffect(() => {
    if (data.roles) {
      setRoles(data.roles);
    }
  }, [data.roles]);
  /** captura de errores */
  useEffect(() => {
    const message =
      error?.roles?.message ||
      error?.newRole?.message ||
      error?.updateRole?.message ||
      error?.deleteRole?.message;
    const dataMessage =
      error?.roles?.response?.data ||
      error?.newRole?.response?.data ||
      error?.updateRol?.response?.data ||
      error?.deleteRole?.response?.data;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${dataMessage}, message:${message}`);
      }, 200);
    }
  }, [error]);
  /** functions */
  const onSaveRol = async () => {
    if (newRole.id) {
      await sendRequest("PUT", UPDATE_ROL, newRole, "upadteRole");
    } else {
      await sendRequest("POST", ADD_ROL, newRole, "newRole");
    }
    await sendRequest("GET", GET_ALL_ROLES, {}, "roles");
    setNewRole(ROL);
  };
  const onDelete = async (id) => {
    const eliminar = showConfirmationAlert(
      "¿Realmente desea eliminar el registro?"
    );
    if ((await eliminar).isConfirmed) {
      await sendRequest("DELETE", DELETE_ROL + id, {}, "deleteRole");
      await sendRequest("GET", GET_ALL_ROLES, {}, "roles");
    }
  };

  /** render */
  return (
    <div>
      <div>
        <input
          value={newRole.nombre}
          onChange={(e) => setNewRole({ ...newRole, nombre: e.target.value })}
        />
        <button onClick={onSaveRol}>Save</button>
      </div>
      <div>
        Roles existentes:
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(roles || []).map((rol) => (
                <tr key={rol.id} className="hover:bg-blue-400">
                  <td>
                    <span>{rol.nombre}</span>
                  </td>
                  <td>
                    <button onClick={() => setNewRole(rol)}>
                      <MdEdit />
                    </button>
                    <button onClick={() => onDelete(rol.id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
