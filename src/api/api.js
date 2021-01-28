const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

const option = {
  post: (contents) => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (contents) => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),
};

const request = async (url, option = {}) => {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (err) {
    alert(`💣 Error : ${err}💣`);
  }
};

export const API = {
  loadUsers: () => {
    return request(`${BASE_URL}/users`);
  },
  addUser: (userName) => {
    const content = {
      name: userName,
    };
    return request(`${BASE_URL}/users`, option.post(content));
  },
};
