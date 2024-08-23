import { useEffect, useState } from "react";
import useAxiosBack from "../../../../hooks/useAxiosBack";
import {
  showConfirmationAlert,
  showErrorAlert,
} from "../../../../utils/alertUtils";
import {
  ADD_PERMISSION,
  DELETE_PERMISSION,
  GET_ALL_PERMISSIONS,
  UPDATE_PERMISSION,
} from "../../../../utils/urls";
import { PERMISO } from "../../models/models";
import { MdDelete, MdEdit } from "react-icons/md";

export const Permisos = () => {
  /**hooks */
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState(PERMISO);
  const { data, error, sendRequest } = useAxiosBack();
  /** useEffects */
  /** inicial */
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", GET_ALL_PERMISSIONS, {}, "permissions");
    };
    fetchData();
  }, []);
  /** validacion de datos */
  useEffect(() => {
    if (data.permissions) {
      setPermissions(data.permissions);
    }
  }, [data.permissions]);
  /** captura de errores */
  useEffect(() => {
    const message =
      error?.permissions?.message ||
      error?.newPermission?.message ||
      error?.updatePermission?.message ||
      error?.deletePermission?.message;
    const dataMessage =
      error?.permissions?.response?.data ||
      error?.newPermission?.response?.data ||
      error?.updatePermission?.response?.data ||
      error?.deletePermission?.response?.data;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${dataMessage}, message:${message}`);
      }, 200);
    }
  }, [error]);
  /** functions */
  const onSaveRol = async () => {
    if (newPermission.id) {
      await sendRequest(
        "PUT",
        UPDATE_PERMISSION,
        newPermission,
        "updatePermission"
      );
    } else {
      await sendRequest("POST", ADD_PERMISSION, newPermission, "newPermission");
    }
    await sendRequest("GET", GET_ALL_PERMISSIONS, {}, "permissions");
    setNewPermission(PERMISO);
  };
  const onDelete = async (id) => {
    const eliminar = showConfirmationAlert(
      "¿Realmente desea eliminar el registro?"
    );
    if ((await eliminar).isConfirmed) {
      await sendRequest(
        "DELETE",
        DELETE_PERMISSION + id,
        {},
        "deletePermission"
      );
      await sendRequest("GET", GET_ALL_PERMISSIONS, {}, "permissions");
    }
  };

  /** render */
  return (
    <div>
      <div>
        <input
          value={newPermission.nombre}
          onChange={(e) =>
            setNewPermission({ ...newPermission, nombre: e.target.value })
          }
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
              {(permissions || []).map((per) => (
                <tr key={per.id} className="hover:bg-blue-400">
                  <td>
                    <span>{per.nombre}</span>
                  </td>
                  <td>
                    <button onClick={() => setNewPermission(per)}>
                      <MdEdit />
                    </button>
                    <button onClick={() => onDelete(per.id)}>
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
