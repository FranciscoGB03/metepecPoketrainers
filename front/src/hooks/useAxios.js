import { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

const useAxios = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Definir una función asincrónica para obtener datos
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance(url, options);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Llamar a la función asincrónica
    fetchData();
  }, []); // Asegúrate de que las dependencias sean estables

  return { data, error, loading };
};

export default useAxios;