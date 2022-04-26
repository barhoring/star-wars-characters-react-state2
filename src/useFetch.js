import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setLoading(true);
    // setResponse(null);
    // setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setError(false);
        setResponse(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  return [response, loading, error];
};
