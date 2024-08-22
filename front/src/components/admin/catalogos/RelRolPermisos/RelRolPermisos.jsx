import { useEffect, useState } from "react";
import "./styles.css";
import useAxiosBack from "../../../../hooks/useAxiosBack";
import { showErrorAlert, showSuccessAlert } from "../../../../utils/alertUtils";

function RelRolPermisos() {
  /**hooks */
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const { data, error, sendRequest } = useAxiosBack();
  /**useEffect */
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", "/getAllPermisos", {}, "permisos");
      await sendRequest("GET", "/getAllRoles", {}, "roles");
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.permisos) {
      setPermissions(data.permisos);
    }
    if (data.roles) {
      setRoles(data.roles);
    }
    if (data.permissionsByRol) {
      setRolePermissions(data.permissionsByRol || []); // Set to empty array if null
    }
  }, [data.permisos, data.roles, data.permissionsByRol]);

  useEffect(() => {
    if (data.save) {
      showSuccessAlert(data.save.message);
    }
  }, [data.save]);

  useEffect(() => {
    const message = error?.save?.message;
    if (message) {
      setTimeout(() => {
        showErrorAlert(`Error:${error.save.response.data}, message:${message}`);
      }, 200);
    }
  }, [error]);
  /** functions */
  const onSelectedRole = async (rol) => {
    setSelectedRole(rol);
    const response = await sendRequest(
      "GET",
      "/getAllPermissionsByRole/" + rol.id,
      {},
      "permissionsByRol"
    );
    setRolePermissions(response || []);
  };

  const togglePermission = (permission) => {
    setRolePermissions((prevPermissions) => {
      const currentPermissions = prevPermissions || [];
      if (currentPermissions.some((perm) => perm.id === permission.id)) {
        // Quitar permiso
        return currentPermissions.filter((perm) => perm.id !== permission.id);
      } else {
        // Agregar permiso
        return [...currentPermissions, permission];
      }
    });
  };
  /** metodo  para guardar permisos por rol */
  const onSave = async () => {
    await sendRequest(
      "POST",
      "/savePermissionsByRole",
      { rol: selectedRole.id, permisos: rolePermissions },
      "save"
    );
    const response = await sendRequest(
      "GET",
      "/getAllPermissionsByRole/" + selectedRole.id,
      {},
      "permissionsByRol"
    );
    setRolePermissions(response || []);
  };
  /**render */
  return (
    <div className="role-permission-manager">
      <div className="sidebar">
        <h2>Roles</h2>
        {roles.map((role) => (
          <button
            key={role.id}
            className={`card ${selectedRole?.id === role.id ? "active" : ""}`}
            onClick={() => onSelectedRole(role)}
          >
            <h3>{role.nombre}</h3>
          </button>
        ))}
      </div>

      <div className="content">
        {selectedRole ? (
          <div className="card">
            <h2>Permisos para {selectedRole.nombre}</h2>
            <div>
              <button onClick={() => onSave()}>Guardar</button>
            </div>
            {permissions.map((permission) => (
              <div key={permission.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={rolePermissions.some(
                      (perm) => perm.id === permission.id
                    )}
                    onChange={() => togglePermission(permission)}
                  />
                  {permission.nombre}
                </label>
              </div>
            ))}
            <button onClick={() => setSelectedRole(null)}>Volver</button>
          </div>
        ) : (
          <div className="card">
            <h2>Selecciona un rol para ver y editar los permisos</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default RelRolPermisos;
