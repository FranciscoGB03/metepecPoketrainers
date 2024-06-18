// src/utils/alertUtils.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Configuración básica de SweetAlert2
const baseConfig = {
  icon: 'info',
  showCancelButton: true,
  cancelButtonColor: '#3085d6',
  cancelButtonText: 'Cancelar',
};

// Función para mostrar una alerta de éxito
export const showSuccessAlert = (message) => {
  return MySwal.fire({
    ...baseConfig,
    icon: 'success',
    title: 'Éxito',
    text: message,
    showConfirmButton:false,
    showCancelButton:false,
    timer:1000
  });
};

// Función para mostrar una alerta de error
export const showErrorAlert = (message) => {
  return MySwal.fire({
    ...baseConfig,
    icon: 'error',
    title: 'Error',
    text: message,
    showCancelButton: false,
    //confirmButtonText:'aceptar'
  });
};

// Función para mostrar una alerta de confirmación
export const showConfirmationAlert = (message) => {
  return MySwal.fire({
    ...baseConfig,
    icon: 'warning',
    title: 'Confirmación',
    text: message,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
  });
};

// Otras configuraciones según sea necesario
