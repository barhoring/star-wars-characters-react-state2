import { useEffect, useReducer } from 'react';

const LOADING = 'LOADING';
const RESPONSE_COMPLETE = 'RESPONSE_COMPLETE';
const ERROR = 'ERROR';

const initialState = {
  result: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === LOADING) {
    return initialState;
  }
  if (action.type === RESPONSE_COMPLETE) {
    return { result: action.payload, error: null, loading: false };
  }
  if (action.type === ERROR) {
    return {
      loading: false,
      result: null,
      error: action.payload.error,
    };
  }

  return state;
};

export const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    dispatch({ type: LOADING });
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        dispatch({ type: RESPONSE_COMPLETE, payload: response });
      })
      .catch((error) => {
        console.log('error is', error.message);
        dispatch({ type: ERROR, payload: { error } });
      });
  }, []);

  const { result: response, loading, error } = state;

  return [response, loading, error];
};
