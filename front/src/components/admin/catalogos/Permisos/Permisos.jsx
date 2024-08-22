import { useEffect, useState } from "react";
import useAxiosBack from "../../../../hooks/useAxiosBack";
import { showErrorAlert } from "../../../../utils/alertUtils";

export const Permisos = () => {
  /**hooks */
  const [permisos, setPermisos] = useState([]);
  const { data, error, sendRequest } = useAxiosBack();
  /** useEffects */
  /** carga inicial */
  useEffect(() => {
    const fetchData = async () => {
      await sendRequest("GET", "/getAllPermisos", {}, "permisos");
    };
    fetchData();
  }, []);
  /** validacion de datos */
  useEffect(() => {
    if (data.permisos) {
      setPermisos(data.permisos);
    }
  }, [data.permisos]);
  /** captura de errores */
  useEffect(() => {
    const message = error?.permisos?.message;
    if (message) {
      setTimeout(() => {
        showErrorAlert(
          `Error:${error.permisos.response.data}, message:${message}`
        );
      }, 200);
    }
  }, [error.permisos]);
  /** render */
  return (
    <div>
      Permisos existentes:
      {(permisos || []).map((per) => (
        <div key={per.id}>{per.nombre}</div>
      ))}
    </div>
  );
};
