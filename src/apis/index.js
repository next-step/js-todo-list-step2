export const BASE_URL =
  'https://js-todo-list-9ca3a.df.r.appspot.com/api/users/';
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const fetchAPI = async (url = '', method = METHOD.GET, payload = {}) => {
  try {
    const option = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (method !== METHOD.GET) {
      option.body = JSON.stringify(payload);
    }

    const response = await fetch(`${BASE_URL}${url}`, option);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
