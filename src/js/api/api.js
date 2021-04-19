const ENDPOINT = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const request = async (url, name) => {
  try {
    const result = await fetch(url, {
      method: name ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(name),
    });
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  getUser: (id) => {
    return request(`${ENDPOINT}/api/users/${id ? id : ''}`);
  },

  setUser: (name) => {
    return request(`${ENDPOINT}/api/users/`, { name: name });
  },
};
