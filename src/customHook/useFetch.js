import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = "9|uD8jekiaHPaOyrYxApumGaIzmhmYDTmnH8CB4fSr"
    useEffect(() => {
        fetchData();
    }, [url]);
const token = "9|uD8jekiaHPaOyrYxApumGaIzmhmYDTmnH8CB4fSr"
    const fetchData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(url, config);
            setData(response.data);
            setIsLoading(false)
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, isLoading, error };
};

export default useFetch;