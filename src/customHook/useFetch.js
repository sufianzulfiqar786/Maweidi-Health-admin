import { useState } from 'react';
import { useQuery, QueryClient } from 'react-query';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = "15|ErlB5AkM0cJkebRZ9q7doxTa86PMmvHKtEJjXBqS";
  const BaseURL = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}/${url}`, config);
    return response.data;
  };

  

  const { data: queryData, isLoading: queryIsLoading, error: queryError } = useQuery(url, fetchData, {
    onSuccess: (data) => {
      setData(data);
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error);
      setIsLoading(false);
    },
  });

  // Update the local state when the query data changes
  useState(() => {
    setData(queryData);
    setIsLoading(queryIsLoading);
    setError(queryError);
  }, [queryData, queryIsLoading, queryError]);

  return { data, isLoading, error };
};
export default useFetch;