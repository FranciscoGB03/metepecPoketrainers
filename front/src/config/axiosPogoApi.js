import axios from 'axios';

const axiosPogo = axios.create({
  baseURL: 'https://pogoapi.net/api', // Reemplaza con tu URL base
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    'Accept':'*/*'
    // Agrega cualquier otro encabezado que necesites
  }
});

export default axiosPogo;