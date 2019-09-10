import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAxios(url) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(url);
        setResponse(data);
      } catch (err) {
        setError(err);
      }
    }
    fetch();
  }, [url]);

  return { response, error };
}
