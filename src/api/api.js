import { BASE_URL } from '../constant/api.js';

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
    const response = await fetch(`${BASE_URL}${url}`, option);
    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (err) {
    alert(`💣 Error : ${err} 💣`);
  }
};

export const API = {
  getUsers: () => {
    return request('/users');
  },

  addUser: (userName) => {
    const content = {
      name: userName,
    };
    return request('/users', option.post(content));
  },

  getUser: (userId) => {
    return request(`/users/${userId}`);
  },

  getUserTodos: (userId) => {
    return request(`/users/${userId}/items`);
  },

  deleteUser: (userId) => {
    return request(`/users/${userId}`, option.delete());
  },

  addTodo: (title, userId) => {
    const content = {
      contents: title,
    };

    console.log(title, userId);

    return request(`/users/${userId}/items`, option.post(content));
  },
};
