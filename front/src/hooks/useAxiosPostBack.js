import { useState } from 'react';
import axiosInstance from '../config/axiosConfigback';

const useAxiosPost = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = async (url,data) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(url, data);
            setResponse(res.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { response, error, loading, postData };
};

export default useAxiosPost;