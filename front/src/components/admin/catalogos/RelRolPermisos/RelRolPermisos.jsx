import { useEffect, useState } from "react";
import "./styles.css";
import useAxiosBack from "../../../../hooks/useAxiosBack";
import { showErrorAlert, showSuccessAlert } from "../../../../utils/alertUtils";
import {
  GET_ALL_PERMISSIONS,
  GET_ALL_PERMISSIONS_BY_ROL,
  GET_ALL_ROLES,
  SAVE_PERMISSION_BY_ROLE,
} from "../../../../utils/urls";

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
      await sendRequest("GET", GET_ALL_PERMISSIONS, {}, "permisos");
      await sendRequest("GET", GET_ALL_ROLES, {}, "roles");
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
    const rol_id = rol.target.value;

    setSelectedRole(rol_id);
    const response = await sendRequest(
      "GET",
      GET_ALL_PERMISSIONS_BY_ROL + rol_id,
      {},
      "permissionsByRol"
    );
    setRolePermissions(response || []);
    console.log(rolePermissions);
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
    console.log('rol',selectedRole);
    console.log('permisos',rolePermissions);
    // await sendRequest(
    //   "POST",
    //   SAVE_PERMISSION_BY_ROLE,
    //   { rol: selectedRole.id, permisos: rolePermissions },
    //   "save"
    // );
    // const response = await sendRequest(
    //   "GET",
    //   GET_ALL_PERMISSIONS_BY_ROL + selectedRole.id,
    //   {},
    //   "permissionsByRol"
    // );
    // setRolePermissions(response || []);
  };
  /**render */
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-11/12 h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mt-10 ">
        <h1 className="text-3xl font-semibold pb-5 text-center">Roles</h1>
        <div className="flex flex-row">
          <div className="basis-3/5	">
            <h2 className="text-2xl">
              Selecciona un rol para ver y editar los permisos
            </h2>
          </div>
          <div>
            <select
              name="rol-user"
              className="text-lg pl-5 pr-5"
              onChange={(e) => onSelectedRole(e)}
            >
              {roles.map((role) => (
                <option className="m-4" value={role.id} key={role.id}>
                  {role.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="text-right justify-end items-end ml-5">
            <button onClick={() => onSave()}>Guardar</button>
          </div>
        </div>

        <div className="m-2" >
         
            {permissions.map((permission) => (
              <div  className="flex" key={permission.id}>
                <div>
                  <input
                    type="checkbox"
                    checked={rolePermissions.some(
                      (perm) => perm.id === permission.id
                    )}
                    onChange={() => togglePermission(permission)}
                  />
                </div>
                <div className="ml-4">
                  {permission.nombre}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RelRolPermisos;

// function RelRolPermisos() {
//   /**hooks */
//   const [selectedRole, setSelectedRole] = useState(null);
//   const [roles, setRoles] = useState([]);
//   const [permissions, setPermissions] = useState([]);
//   const [rolePermissions, setRolePermissions] = useState([]);
//   const { data, error, sendRequest } = useAxiosBack();
//   /**useEffect */
//   useEffect(() => {
//     const fetchData = async () => {
//       await sendRequest("GET", GET_ALL_PERMISSIONS, {}, "permisos");
//       await sendRequest("GET", GET_ALL_ROLES, {}, "roles");
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data.permisos) {
//       setPermissions(data.permisos);
//     }
//     if (data.roles) {
//       setRoles(data.roles);
//     }
//     if (data.permissionsByRol) {
//       setRolePermissions(data.permissionsByRol || []); // Set to empty array if null
//     }
//   }, [data.permisos, data.roles, data.permissionsByRol]);

//   useEffect(() => {
//     if (data.save) {
//       showSuccessAlert(data.save.message);
//     }
//   }, [data.save]);

//   useEffect(() => {
//     const message = error?.save?.message;
//     if (message) {
//       setTimeout(() => {
//         showErrorAlert(`Error:${error.save.response.data}, message:${message}`);
//       }, 200);
//     }
//   }, [error]);
//   /** functions */
//   const onSelectedRole = async (rol) => {
//     setSelectedRole(rol);
//     const response = await sendRequest(
//       "GET",
//       GET_ALL_PERMISSIONS_BY_ROL + rol.id,
//       {},
//       "permissionsByRol"
//     );
//     setRolePermissions(response || []);
//   };

//   const togglePermission = (permission) => {
//     setRolePermissions((prevPermissions) => {
//       const currentPermissions = prevPermissions || [];
//       if (currentPermissions.some((perm) => perm.id === permission.id)) {
//         // Quitar permiso
//         return currentPermissions.filter((perm) => perm.id !== permission.id);
//       } else {
//         // Agregar permiso
//         return [...currentPermissions, permission];
//       }
//     });
//   };
//   /** metodo  para guardar permisos por rol */
//   const onSave = async () => {
//     await sendRequest(
//       "POST",
//       SAVE_PERMISSION_BY_ROLE,
//       { rol: selectedRole.id, permisos: rolePermissions },
//       "save"
//     );
//     const response = await sendRequest(
//       "GET",
//       GET_ALL_PERMISSIONS_BY_ROL + selectedRole.id,
//       {},
//       "permissionsByRol"
//     );
//     setRolePermissions(response || []);
//   };
//   /**render */
//   return (
//     <div className="role-permission-manager">
//       <div className="sidebar">
//         <h2>Roles</h2>
//         {roles.map((role) => (
//           <button
//             key={role.id}
//             className={`card ${selectedRole?.id === role.id ? "active" : ""}`}
//             onClick={() => onSelectedRole(role)}
//           >
//             <h3>{role.nombre}</h3>
//           </button>
//         ))}
//       </div>

//       <div className="content">
//         {selectedRole ? (
//           <div className="card">
//             <h2>Permisos para {selectedRole.nombre}</h2>
//             <div>
//               <button onClick={() => onSave()}>Guardar</button>
//             </div>
//             {permissions.map((permission) => (
//               <div key={permission.id}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={rolePermissions.some(
//                       (perm) => perm.id === permission.id
//                     )}
//                     onChange={() => togglePermission(permission)}
//                   />
//                   {permission.nombre}
//                 </label>
//               </div>
//             ))}
//             <button onClick={() => setSelectedRole(null)}>Volver</button>
//           </div>
//         ) : (
//           <div className="card">
//             <h2>Selecciona un rol para ver y editar los permisos</h2>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RelRolPermisos;
