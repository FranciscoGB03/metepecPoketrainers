import { useState } from 'react';
import axiosInstance from '../config/axiosConfigback';
/**
 * hook personalizado para realizar cualquier tipo de http request> POST, GET, PUT o DELETE
 * @returns
 */
const useAxiosBack = () => {
    /** contiene los datos de la consulta */
    const [data, setData] = useState(null);
    /** captura posibles errores al realizar la operacion http */
    const [error, setError] = useState(null);
    /** proporciona el estatus de cargado */
    const [loading, setLoading] = useState(false);

    /**
     * 
     * @param {string} method tipo de metodo: POST,GET,PUT,DELETE 
     * @param {string} url url de servicio
     * @param {any} options datos que se requiere en la peticion http
     * @returns {Promise} retorna una promesa 
     */
    const sendRequest = async (method,url,options={}) => {
        setLoading(true);
        try {
            let res;
            switch (method) {
                case 'GET':
                    res = await axiosInstance.get(url, options);
                    break;
                case 'POST':
                    res = await axiosInstance.post(url, options);
                    break;
                case 'PUT':
                    res = await axiosInstance.put(url, options);
                    break;
                case 'DELETE':
                    res = await axiosInstance.delete(url,options);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            setData(res.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { data, setData, error, loading, sendRequest };
};

export default useAxiosBack;