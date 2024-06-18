// src/utils/alertUtils.js
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// Configuración básica de SweetAlert2
const baseConfig = {
  icon: "info",
  showCancelButton: true,
  cancelButtonColor: "#3085d6",
  cancelButtonText: "Cancelar",
};

// Función para mostrar una alerta de éxito
export const showSuccessAlert = (message) => {
  return MySwal.fire({
    ...baseConfig,
    icon: "success",
    title: "Éxito",
    text: message,
    showConfirmButton: false,
    showCancelButton: false,
    timer: 1000,
  });
};

export const showErrorAlert = (message, duration = 2000) => {
  return MySwal.fire({
    ...baseConfig,
    icon: "error",
    title: "Error",
    text: message,
    showCancelButton: false,
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: duration, // Establece el tiempo en milisegundos antes de que la alerta se cierre automáticamente
    timerProgressBar: true, // Muestra una barra de progreso durante el tiempo de la alerta
  });
};

// Función para mostrar una alerta de confirmación
export const showConfirmationAlert = (message) => {
  return MySwal.fire({
    ...baseConfig,
    icon: "warning",
    title: "Confirmación",
    text: message,
    confirmButtonColor: "#d33",
    confirmButtonText: "Confirmar",
  });
};

// carga de datos
export const showLoadingAlert = () => {
  return Swal.fire({
    title: "Cargando...",
    text: "Por favor, espere",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoadingAlert = () => {
  Swal.close();
};