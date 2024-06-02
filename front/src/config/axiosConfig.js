import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Reemplaza con tu URL base
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    'Accept':'*/*'
    // Agrega cualquier otro encabezado que necesites
  }
});

export default axiosInstance;