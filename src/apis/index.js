const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const $request = async (url = '', options) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, options);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const $http = {
  get: (url) => $request(url),
  post: (url, body = '') => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return $request(url, options);
  },
  put: (url, body = '') => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return $request(url, options);
  },
  delete: (url) => $request(url, { method: 'DELETE' }),
};
