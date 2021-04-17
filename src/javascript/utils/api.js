import { BASE_URL, ERROR_MESSAGE, RETRY_COUNT, METHODS } from './constants.js';

const fetch_retry = async (url, options, errorMessage, n = RETRY_COUNT) => {
  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('fetch retry!');
    }
    return await response.json();
  } catch (err) {
    if (n <= 1) {
      throw new Error(errorMessage);
    }
    return await fetch_retry(url, options, errorMessage, n - 1);
  }
};

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

function getUsers() {
  return fetch_retry(
    makeURL({ cmd: 'getUsers' }),
    makeOption(METHODS.GET),
    ERROR_MESSAGE.GET_USERS
  );
}

function createItem(userId, contents) {
  return fetch_retry(
    makeURL({ cmd: 'createItem', userId }),
    makeOption(METHODS.POST, { contents }),
    ERROR_MESSAGE.CREATE_ITEM
  );
}

function addUser(name) {
  return fetch_retry(
    makeURL({ cmd: 'addUser' }),
    makeOption(METHODS.POST, { name }),
    ERROR_MESSAGE.ADD_USER
  );
}

function deleteUser(userId) {
  return fetch_retry(
    makeURL({ cmd: 'deleteUser', userId }),
    makeOption(METHODS.DELETE),
    ERROR_MESSAGE.DELETE_USER
  );
}

function getUser(userId) {
  return fetch_retry(
    makeURL({ cmd: 'getUser', userId }),
    makeOption(METHODS.GET),
    ERROR_MESSAGE.GET_USER
  );
}

function deleteItem(userId, itemId) {
  return fetch_retry(
    makeURL({ cmd: 'deleteItem', userId, itemId }),
    makeOption(METHODS.DELETE),
    ERROR_MESSAGE.DELETE_ITEM
  );
}

function deleteAllTodoOfUser(userId) {
  return fetch_retry(
    makeURL({ cmd: 'deleteAllTodoOfUser', userId }),
    makeOption(METHODS.DELETE),
    ERROR_MESSAGE.DELETE_ALL_ITEM
  );
}

function updatePriority(userId, itemId, priority) {
  return fetch_retry(
    makeURL({ cmd: 'updatePriority', userId, itemId }),
    makeOption(METHODS.PUT, { priority }),
    ERROR_MESSAGE.SET_PRIORITY
  );
}

function updateComplete(userId, itemId) {
  console.log(this);
  return fetch_retry(
    makeURL({ cmd: 'updateComplete', userId, itemId }),
    makeOption(METHODS.PUT),
    ERROR_MESSAGE.UPDATE_COMPLETE
  );
}

function updateContents(userId, itemId, contents) {
  return fetch_retry(
    makeURL({ cmd: 'updateContents', userId, itemId }),
    makeOption(METHODS.PUT, { contents }),
    ERROR_MESSAGE.UPDATE_CONTENT
  );
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

export {
  getUsers,
  addUser,
  deleteUser,
  getUser,
  updateComplete,
  updateContents,
  updatePriority,
  createItem,
  deleteItem,
  deleteAllTodoOfUser,
};
