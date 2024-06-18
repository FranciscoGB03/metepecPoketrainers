import { showConfirmationAlert } from "../../../utils/alertUtils";
/**
 * funcion para agregar un competidor a la liga local 
 * @param {} sendRequest  funcion para mandar request al backend
 * @param {*} newCompetidor  objeto que contiene la informacion del competidor
 */
export const agregarJugador = async (sendRequest, newCompetidor) => {
  await sendRequest(
    "POST",
    "/registrarCompetidor",
    newCompetidor,
    "addCompetidor"
  );
  await sendRequest("GET", "/getLigaLocal", {}, "competidores");
};
/**
 * funcion para eliminar un competidor de la liga con todos los pokemon registrados
 * @param {} sendRequest funcion para mandar request al backend
 * @param {*} id id del competidor a eliminar
 */
export const eliminarJugador = async (sendRequest, id) => {
  const eliminar = showConfirmationAlert(
    "¿Realmente desea eliminar el registro?"
  );
  if ((await eliminar).isConfirmed) {
    await sendRequest("DELETE", "/eliminarCompetidor/" + id, {}, "competidor");
    await sendRequest("GET", "/getLigaLocal", {}, "competidores");
  }
};
/**
 * funcion para actualizar los campos para agregar un nuevo competidor de liga local
 * @param {*} e evento target
 * @param {*} setNewCompetidor funcion setter para actualizar los datos del nuevo competidor 
 * @param {*} catalogo catalogo del que se obtendra la info
 */
export const handleInputChange = (e,setNewCompetidor,catalogo ) => {
  const { name, value } = e.target;
  if (name == "equipo_insignia") {
    const po = catalogo.find((p) => {
      if (p.id == value) {
        return p;
      }
    });
    setNewCompetidor((prev) => ({
      ...prev,
      [name]: po,
    }));
  } else {
    setNewCompetidor((prev) => ({
      ...prev,
      [name]: name == "puntos" ? parseInt(value) : value,
    }));
  }
};
