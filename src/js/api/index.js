import { ERROR_TYPE_BY_MESSAGE, ERROR_TYPE } from '../utils/errors.js';

const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const headers = { 'Content-Type': 'application/json' };

const options = {
  GET: { method: HttpMethod.GET },
  POST: (body = '') => {
    return {
      method: HttpMethod.POST,
      headers,
      body: body ? JSON.stringify(body) : '',
    };
  },
  PUT: (body = '') => {
    return {
      method: HttpMethod.PUT,
      headers,
      body: body ? JSON.stringify(body) : '',
    };
  },
  DELETE: {
    method: HttpMethod.DELETE,
  },
};

const endPoints = {
  getUserList: 'api/users',
  addUser: 'api/users',
  getUser: (userId) => `api/users/${userId}`,
  removeUser: (userId) => `api/users/${userId}`,
  getUserTodo: (userId) => `api/users/${userId}/items/`,
  addTodoItem: (userId) => `api/users/${userId}/items/`,
  removeAllTodo: (userId) => `api/users/${userId}/items/`,
  removeTodo: (userId, itemId) => `api/users/${userId}/items/${itemId}`,
  updateTodo: (userId, itemId) => `api/users/${userId}/items/${itemId}`,
  todoToggle: (userId, itemId) => `api/users/${userId}/items/${itemId}/toggle`,
  setPriority: (userId, itemId) =>
    `api/users/${userId}/items/${itemId}/priority`,
};

const request = async (endPoint, option = {}) => {
  const response = await fetch(baseUrl + endPoint, option);
  const data = await response.json();
  console.log(data.message);
  if (!response.ok) {
    throw ERROR_TYPE_BY_MESSAGE[data.message] ?? ERROR_TYPE.SERVER_ERROR;
  }
  return data;
};

const api = {
  getUserList: async () => {
    return await request(endPoints.getUserList, options.GET);
  },

  getUser: async (userId) => {
    return await request(endPoints.getUser(userId), options.GET);
  },

  addUser: async (name) => {
    return await request(endPoints.addUser, options.POST({ name }));
  },

  removeUser: async (userId) => {
    return await request(endPoints.removeUser(userId), options.DELETE);
  },

  getUserTodo: async (userId) => {
    return await request(endPoints.getUserTodo(userId), options.GET);
  },

  addTodoItem: async (userId, contents) => {
    return await request(
      endPoints.addTodoItem(userId),
      options.POST({ contents }),
    );
  },

  updateTodo: async (userId, itemId, contents) => {
    return await request(
      endPoints.updateTodo(userId, itemId),
      options.PUT({ contents }),
    );
  },

  removeTodo: async (userId, itemId) => {
    return await request(endPoints.removeTodo(userId, itemId), options.DELETE);
  },
  removeAllTodos: async (userId) => {
    return await request(endPoints.removeAllTodo(userId), options.DELETE);
  },
  setTodoPriority: async (userId, itemId, priority) => {
    return await request(
      endPoints.setPriority(userId, itemId),
      options.PUT({ priority }),
    );
  },
  toggleTodoComplete: async (userId, itemId) => {
    return await request(endPoints.todoToggle(userId, itemId), options.PUT());
  },
};

export default api;
