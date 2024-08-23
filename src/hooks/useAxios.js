import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useAxios = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const source = axios.CancelToken.source();

    setLoading(true);
    setError(null);

    try {
      const response = await axios(url, {
        ...options,
        cancelToken: source.token,
      });
      setData(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      source.cancel("Operation cancled by the user.");
    };
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useAxios;
