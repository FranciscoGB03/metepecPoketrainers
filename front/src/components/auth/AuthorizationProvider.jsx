import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "./helpers";
import useAxiosBack from "../../hooks/useAxiosBack";
import { GET_ALL_PERMISSIONS_BY_ROL } from "../../utils/urls";
/** generacion de un contexto para tener valores y funciones globales */
const AuthorizationContext = createContext();

/** contexto para obtener  los permisos al recargar la pagina */
export const AuthorizationProvider = ({ children }) => {
  const { data, sendRequest } = useAxiosBack();
  const [permisos, setPermisos] = useState([]);
  /**  funcion  para cargar los permisos por rol */
  const fetchData = async () => {
    await sendRequest(
      "GET",
      GET_ALL_PERMISSIONS_BY_ROL + "1",
      {},
      "permissions"
    );
  };
  /** verificacion de existenia de permisos */
  const getPermiso = (permiso) => {
    const search = permisos.filter((per) => per.nombre === permiso);
    return search.length > 0;
  };
  /** useEffect */
  useEffect(() => {
    /**validacion del token */
    if (!isTokenExpired()) {
      console.log("token valido");
      /**obtencion del rol */
      fetchData();
    } else {
      console.log("token invalido");
    }
  }, []);

  useEffect(() => {
    if (data.permissions) {
      setPermisos(data.permissions);
    }
  }, [data.permissions]);
  /**retorno de los permisos */
  return (
    <AuthorizationContext.Provider value={{ permisos, fetchData, getPermiso }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
/** creacion del hook para obtener  los permisos */
export const useAuthorization = () => {
  return useContext(AuthorizationContext);
};
