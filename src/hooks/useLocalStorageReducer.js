import { useReducer, useEffect } from 'react';

export default function useLocalStorageReducer(key, initialState, reducer) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (e) {
      return initialState;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
