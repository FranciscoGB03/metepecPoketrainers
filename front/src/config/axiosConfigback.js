import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `${backendUrl}`, // Reemplaza con tu URL base
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    'Accept':'*/*'
    // Agrega cualquier otro encabezado que necesites
  }
});

export default axiosInstance;