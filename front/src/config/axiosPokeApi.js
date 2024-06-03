import axios from 'axios';

const axiosPokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2', // Reemplaza con tu URL base
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
    'Accept':'*/*'
    // Agrega cualquier otro encabezado que necesites
  }
});

export default axiosPokeApi;