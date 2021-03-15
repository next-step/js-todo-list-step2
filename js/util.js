const generateKey = () => {
  return new Date().valueOf().toString();
};

const REQUEST_METHODS = {
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

const _catchHTTPStatusError = (fn) => {
  return (...args) => {
    return fn(...args).then((response) => {
      if (!response.ok) {
        throw new Error(response);
      }
      return response.json();
    });
  };
};

const createRequestBody = (body) => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

const fetchData = (url, method = 'GET', body) => {
  const requestBody = body ? createRequestBody(body) : {};
  const options = {
    method: method,
    ...requestBody,
  };

  return fetch(url, options);
};

const fetchWithWrapper = (url, method, body) => {
  const wrappedFunction = _catchHTTPStatusError(() =>
    fetchData(url, method, body)
  );
  //TODO add error redirect wrapper ?
  return wrappedFunction();
};

export { generateKey, REQUEST_METHODS, fetchWithWrapper as fetchRequest };
