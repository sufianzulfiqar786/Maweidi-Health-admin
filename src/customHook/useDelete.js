import { useState } from 'react';
import axios from 'axios';

const useDeleteData = () => {
    const BaseURL = process.env.REACT_APP_BASE_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = "9|uD8jekiaHPaOyrYxApumGaIzmhmYDTmnH8CB4fSr"
    const deleteData = async (url, cb) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        setIsLoading(true);
        try {
            const response = await axios.get(`${BaseURL}/${url}`, config);
            if (response.data?.success === true) {
                cb()
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, deleteData };
};

export default useDeleteData;
