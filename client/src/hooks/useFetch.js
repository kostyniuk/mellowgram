import { useState, useCallback } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = useCallback(async (url, params = { method: 'GET' }, signal) => {
    try {
      setError(false);
      setLoading(true);

      const responce = await fetch(url, params, signal);
      // if (!responce.ok) {
      //   setError(true);
      //   throw new Error('Something wrong with your request');
      // }
      const json = await responce.json();

      if (json.success) {
        return json;
      }

      setError(json.msg);
      return json;
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
};

export default useFetch;
