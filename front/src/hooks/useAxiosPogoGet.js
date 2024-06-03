import { useState } from 'react';
import axiosPogo from '../config/axiosPogoApi';

const useAxiosPogoGet = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchPogoData = async (url,options={}) => {
        setLoading(true);
        try {
            const response = await axiosPogo.get(url,options);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { data, error, loading, fetchPogoData };
};

export default useAxiosPogoGet;