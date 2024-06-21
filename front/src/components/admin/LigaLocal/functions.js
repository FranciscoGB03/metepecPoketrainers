import { showConfirmationAlert } from "../../../utils/alertUtils";
import { CompetidorModel } from "../models/models";
/**
 * funcion para agregar un competidor a la liga local
 * @param {} sendRequest  funcion para mandar request al backend
 * @param {*} newCompetidor  objeto que contiene la informacion del competidor
 */
export const agregarJugador = async (
  sendRequest,
  newCompetidor,
  setNewCompetidor
) => {
  await sendRequest(
    "POST",
    "/registrarCompetidor",
    newCompetidor,
    "addCompetidor"
  );
  await sendRequest("GET", "/getLigaLocal", {}, "competidores");
  setNewCompetidor(CompetidorModel);
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
export const handleInputChange = (e, setNewCompetidor, catalogo) => {
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

/**funciones para el listado */
/**
 * Meetodo para habilitar la edicion del competidor
 * @param {*} data data
 * @param {*} setData funcion para actualizar la data
 * @param {*} id id del competidor a actualizar
 * @param {*} key clave del objeto a modificar dentro de data
 */
export const handleEdit = (data, setData, id, key) => {
  // Buscar el índice del competidor a editar
  const index = data[key].findIndex((comp) => comp.id === id);
  // Marcar el competidor como editable cambiando su estado
  setData((prevData) => {
    const newData = { ...prevData };
    if (newData[key]) {
      newData[key][index] = { ...newData[key][index], editing: true };
      return newData;
    }
  });
};
/**
 * Deshabbilita la edicion del competidor
 * @param {*} data data
 * @param {*} setData funcion para actualizar la data
 * @param {*} id id del competidor a actualizar
 * @param {*} key clave del objeto dentro de data
 */
export const handleCancelEdit = (data, setData, id, key) => {
  // Buscar el índice del competidor en modo edición
  const index = data[key].findIndex((comp) => comp.id === id);
  // Cancelar la edición cambiando su estado a no editado
  setData((prevData) => {
    const newData = { ...prevData };
    newData[key][index] = { ...newData[key][index], editing: false };
    return newData;
  });
};
/**
 * Metodo para actualizar los campos del competidor
 * @param {*} data data
 * @param {*} setData funcion para actualizar data
 * @param {*} key clave del objeto dentro de data
 * @param {*} id id del competidor a actualizar
 * @param {*} field campo a actualizar
 * @param {*} value nuevo valor del campo
 * @param {*} catalogo {catalogo} solo si se trata de un select
 */
export const handleInputUpdate = (
  data,
  setData,
  key,
  id,
  field,
  value,
  catalogo
) => {
  let valor = value;
  // Buscar el índice del competidor en modo edición
  const index = data[key].findIndex((comp) => comp.id === id);
  if (catalogo) {
    let index = catalogo.findIndex((cat) => parseInt(cat.id) == value);
    valor = catalogo[index];
  }
  // Actualizar el valor del campo editado
  setData((prevData) => {
    const newData = { ...prevData };
    newData[key][index] = { ...newData[key][index], [field]: valor };
    return newData;
  });
};

/**
 * Metodo para guardar cambios en el competidor
 * @param {*} data informacion del competidor a actualizar
 * @param {*} sendRequest funcion para conectar con el back
 * @param {*} id id del competidor a actualizar
 * @param {*} key clave del data
 */
export const handleSave = async (data, sendRequest, id, key) => {
  // Buscar el índice del competidor en modo edición
  const index = data[key].findIndex((comp) => comp.id === id);
  const competidor = data[key][index];
  // Enviar la solicitud al servidor para guardar los cambios
  await sendRequest(
    "PUT",
    `/actualizarCompetidor`,
    competidor,
    "actualizaCompetidor"
  );
  await sendRequest("GET", "/getLigaLocal", {}, "competidores");
};

/**
 * Metodo para eliminar pokemons
 * @param {*} sendRequest funcion para conectarse con el back
 * @param {*} id id del pokemon a borrar
 */
export const eliminarPokemon = async (sendRequest, id) => {
  const eliminar = showConfirmationAlert(
    "¿Realmente desea eliminar el registro?"
  );
  if ((await eliminar).isConfirmed) {
    await sendRequest("DELETE", `/eliminarPokemon/${id}`, {}, "eliminaPoke");
    await sendRequest("GET", "/getLigaLocal", {}, "competidores");
  }
};
