import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function useDataApi() {
  const [apiUrl, setApiUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const firstUpdate = useRef(true);
  useEffect(() => {
    setData(null);
    setError(null);
    if (!firstUpdate.current && apiUrl !== '') {
      axios
        .get(apiUrl)
        .then(({ data }) => setData(data))
        .catch(err => setError(err));
    }
    firstUpdate.current = false;
  }, [apiUrl]);
  return { data, error, callApi: setApiUrl };
}
