import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = "15|ErlB5AkM0cJkebRZ9q7doxTa86PMmvHKtEJjXBqS";
  const BaseURL = process.env.REACT_APP_BASE_URL;

  // Function to fetch data from the API
  const fetchData = async (url) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${BaseURL}/${url}`, config);
    return response.data;
  };

  // Use the React Query hook to fetch the data
  const {
    data: queryData,
    isLoading: queryIsLoading,
    error: queryError,
    refetch,
  } = useQuery(url, () => fetchData(url), {
    onSuccess: (data) => {
      setData(data);
      setIsLoading(false);
      console.log(data);
    },
    onError: (error) => {
      setError(error);
      setIsLoading(false);
    },
  });

  // Update the local state when the query data changes
  useEffect(() => {
    setData(queryData);
    setIsLoading(queryIsLoading);
    setError(queryError);
  }, [queryData, queryIsLoading, queryError]);

  // Function to recall the API with the updated URL when paginate prop changes
  const fetchPaginatedData = (refetchurl) => {
    refetch(refetchurl);
  };

  // Return the necessary values
  return { data, isLoading, error, fetchPaginatedData };
};

export default useFetch;
