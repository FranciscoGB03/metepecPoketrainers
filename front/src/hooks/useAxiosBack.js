import { useState } from 'react';
import axiosInstance from '../config/axiosConfigback';
import { getToken } from '../components/auth/helpers';

const useAxiosBack = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState({});

    const sendRequest = async (method, url, options = {}, key = 'data') => {
        setLoading(prevLoading => ({ ...prevLoading, [key]: true }));
        try {
            let res;
            const token = getToken(); 
            const config = {
                ...options,
                headers: {
                    ...options.headers,
                    ...(method !== 'GET' && { Authorization: `Bearer ${token}` })
                }
            };
            switch (method) {
                case 'GET':
                    res = await axiosInstance.get(url, options);
                    break;
                case 'POST':
                    res = await axiosInstance.post(url, options,config);
                    break;
                case 'PUT':
                    res = await axiosInstance.put(url, options,config);
                    break;
                case 'DELETE':
                    res = await axiosInstance.delete(url, config);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            setData(prevData => ({ ...prevData, [key]: res.data }));
            setLoading(prevLoading => ({ ...prevLoading, [key]: false }));
        } catch (err) {
            setError(prevError => ({ ...prevError, [key]: err }));
            setLoading(prevLoading => ({ ...prevLoading, [key]: false }));
        }
    };

    return { data, error, loading, sendRequest, setData };
};

export default useAxiosBack;
