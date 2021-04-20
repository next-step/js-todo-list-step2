import { BASE_URL, ERROR_MESSAGE, METHODS, URL_OPTS } from './constants.js';
import fetchRetry from './fetchRetry.js';

function makeOption(method, body = '') {
  body = body ? JSON.stringify(body) : '';
  const headers = { 'Content-Type': 'application/json' };
  const options = {
    GET: {},
    POST: {
      method,
      headers,
      body,
    },
    PUT: {
      method,
      headers,
      body,
    },
    DELETE: {
      method,
    },
  };
  return options[method];
}

function makeURL(params) {
  const users = `${BASE_URL}/api/users/`;
  const url = {
    getUsers: `${users}`,
    addUser: `${users}`,
    deleteUser: `${users}${params.userId}`,
    getUser: `${users}${params.userId}`,
    updateComplete: `${users}${params.userId}/items/${params.itemId}/toggle`,
    updateContents: `${users}${params.userId}/items/${params.itemId}`,
    updatePriority: `${users}${params.userId}/items/${params.itemId}/priority`,
    createItem: `${users}${params.userId}/items`,
    deleteItem: `${users}${params.userId}/items/${params.itemId}`,
    deleteAllTodoOfUser: `${users}${params.userId}/items`,
  };
  return url[params.cmd];
}

export const API = {
  getUsers: () => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.GET_USERS }),
      makeOption(METHODS.GET),
      ERROR_MESSAGE.GET_USERS
    );
  },

  createItem: (userId, contents) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.CREATE_ITEM, userId }),
      makeOption(METHODS.POST, { contents }),
      ERROR_MESSAGE.CREATE_ITEM
    );
  },

  addUser: (name) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.ADD_USER }),
      makeOption(METHODS.POST, { name }),
      ERROR_MESSAGE.ADD_USER
    );
  },

  deleteUser: (userId) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.DELETE_USER, userId }),
      makeOption(METHODS.DELETE),
      ERROR_MESSAGE.DELETE_USER
    );
  },

  getUser: (userId) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.GET_USER, userId }),
      makeOption(METHODS.GET),
      ERROR_MESSAGE.GET_USER
    );
  },

  deleteItem: (userId, itemId) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.DELETE_ITEM, userId, itemId }),
      makeOption(METHODS.DELETE),
      ERROR_MESSAGE.DELETE_ITEM
    );
  },

  deleteAllTodoOfUser: (userId) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.DELETE_ALL, userId }),
      makeOption(METHODS.DELETE),
      ERROR_MESSAGE.DELETE_ALL_ITEM
    );
  },

  updatePriority: (userId, itemId, priority) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.UPDATE_PRIORITY, userId, itemId }),
      makeOption(METHODS.PUT, { priority }),
      ERROR_MESSAGE.SET_PRIORITY
    );
  },

  updateComplete: (userId, itemId) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.UPDATE_COMPLETE, userId, itemId }),
      makeOption(METHODS.PUT),
      ERROR_MESSAGE.UPDATE_COMPLETE
    );
  },

  updateContents: (userId, itemId, contents) => {
    return fetchRetry(
      makeURL({ cmd: URL_OPTS.UPDATE_CONTENTS, userId, itemId }),
      makeOption(METHODS.PUT, { contents }),
      ERROR_MESSAGE.UPDATE_CONTENT
    );
  },
};

export default API;
