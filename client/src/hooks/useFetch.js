import { useState, useCallback } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(async (url, params = { method: 'GET' }) => {
    try {
      setLoading(true);

      const responce = await fetch(url, params);
      const json = await responce.json();

      if (!json.success) {
        setError(json.msg);
      }
      return json;
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
};

export default useFetch;
