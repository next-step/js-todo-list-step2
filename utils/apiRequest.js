export default {
  get: async (url) => {
    const response = await fetch(url);
    return await response.json();
  },
  put: async (url, body) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    return await response.json();
  },
  post: async (url, body) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    return await response.json();
  },
  delete: async (url) => {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return await response.json();
  },
};
