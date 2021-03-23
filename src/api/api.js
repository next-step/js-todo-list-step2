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
  getUser: userID => {
    return request(`api/users/${userID}`);
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

  deleteUser: userID => {
    return request(`api/users/${userID}`, option.delete());
  },

  getUserTodoItems: userID => {
    return request(`api/users/${userID}/items`);
  },

  addTodoItem: (userID, text) => {
    const content = {
      contents: text,
    };
    return request(`api/users/${userID}/items`, option.post(content));
  },

  toggleTodoItem: (userID, itemID) => {
    return request(`api/users/${userID}/items/${itemID}/toggle`, option.put());
  },

  deleteTodoItem: (userID, itemID) => {
    return request(`api/users/${userID}/items/${itemID}`, option.delete());
  },

  deleteAllTodoItem: userID => {
    return request(`/api/users/${userID}/items/`, option.delete());
  },

  updateTodoItem: (userID, itemID, text) => {
    const content = {
      contents: text,
    };
    return request(`/api/users/${userID}/items/${itemID}`, option.put(content));
  },

  changePriority: (userID, itemID, priority) => {
    const content = {
      priority: priority,
    };

    return request(
      `/api/users/${userID}/items/${itemID}/priority`,
      option.put(content)
    );
  },
};
