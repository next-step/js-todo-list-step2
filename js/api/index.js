import { BASE_URL, METHODS } from '../constants/index.js';

const defaultOptions = (method, body) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

const request = async (method, url, body) => {
  const response = await fetch(BASE_URL + url, defaultOptions(method, body))
    .then(handleErrors)
    .catch(console.error);

  return response.json();
};

export default METHODS.reduce(
  (API, method) => ({
    ...API,
    [method]: (url, body) => request(method, url, body),
  }),
  {}
);
