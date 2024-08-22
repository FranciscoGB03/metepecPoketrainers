import { useEffect, useState } from "react";
import useAxiosBack from "../../../../hooks/useAxiosBack";
import { showErrorAlert } from "../../../../utils/alertUtils";
import { ROL } from "../../models/models";
import { ADD_ROL, GET_ALL_ROLES } from "../../../../utils/urls";

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
    const message = error?.roles?.message || error?.newRole?.message;
    const dataMessage =
      error?.roles?.response?.data || error?.newRole?.response?.data;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${dataMessage}, message:${message}`);
      }, 200);
    }
  }, [error]);
  /** functions */
  const onSaveRol = async () => {
    await sendRequest("POST", ADD_ROL, newRole, "newRole");
    await sendRequest("GET", GET_ALL_ROLES, {}, "roles");
    setNewRole(ROL);
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
      Roles existentes:
      {(roles || []).map((rol) => (
        <div key={rol.id}>{rol.nombre}</div>
      ))}
    </div>
  );
};
