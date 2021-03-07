'use strict';

export const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const option = {
  post: contents => ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: contents => ({
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
    alert(`Error : ${err}`);
  }
};

export const API = {
  getUser: userId => {
    return request(`api/users/${userId}`);
  },

  getUsers: () => {
    return request('api/users');
  },

  addUser: userName => {
    const content = {
      name: userName,
    };
    return request('api/users', option.post(content));
  },

  deleteUser: userId => {
    return request(`api/users/${userId}`, option.delete());
  },

  getUserTodoItems: userId => {
    return request(`api/users/${userId}/items`);
  },

  addTodoItem: (title, userId) => {
    const content = {
      contents: title,
    };
    return request(`api/users/${userId}/items`, option.post(content));
  },

  toggleTodoItem: (userId, itemId) => {
    return request(`api/users/${userId}/items/${itemId}/toggle`, option.put());
  },

  deleteTodoItem: (userId, itemId) => {
    return request(`api/users/${userId}/items/${itemId}`, option.delete());
  },

  deleteAllTodoItem: userId => {
    return request(`/api/users/${userId}/items/`, option.delete());
  },

  updateTodoItem: (userId, itemId, text) => {
    const content = {
      contents: text,
    };
    return request(`/api/users/${userId}/items/${itemId}`, option.put(content));
  },

  changePriority: (userId, itemId, priority) => {
    const content = {
      priority: priority,
    };

    return request(
      `/api/users/${userId}/items/${itemId}/priority`,
      option.put(content)
    );
  },
};
