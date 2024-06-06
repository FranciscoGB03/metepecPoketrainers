import { useState } from 'react';
import axiosInstance from '../config/axiosConfigback';

const useAxiosGet = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url,options={}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(url,options);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { data,setData, error, loading, fetchData };
};

export default useAxiosGet;