export const API = {
  get(url = '') {
    return fetch(url);
  },

  post(url = '', body = {}) {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    return fetch(url, option);
  },
  put(url = '', body = {}) {
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    return fetch(url, option);
  },

  delete(url = '') {
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(url, option);
  },
};
