import { BASE_URL, ERROR_MESSAGE, RETRY_COUNT } from './constants.js';

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

function getUsers() {
  return fetch_retry(`${BASE_URL}/api/users`, {}, ERROR_MESSAGE.GET_USER);
}

function createItem(userId, contents) {
  const requestBody = {
    contents,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items`,
    options,
    ERROR_MESSAGE.CREATE_ITEM
  );
}

function addUser(userName) {
  const requestBody = {
    name: userName,
  };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  return fetch_retry(`${BASE_URL}/api/users`, options, ERROR_MESSAGE.ADD_USER);
}

function deleteUser(userId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}`,
    options,
    ERROR_MESSAGE.DELETE_USER
  );
}

function getUser(userId) {
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}`,
    {},
    ERROR_MESSAGE.GET_USER
  );
}

function deleteItem(userId, itemId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items/${itemId}`,
    options,
    ERROR_MESSAGE.DELETE_ITEM
  );
}

function deleteAllTodoOfUser(userId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items`,
    options,
    ERROR_MESSAGE.DELETE_ALL_ITEM
  );
}

function updatePriority(userId, itemId, priority) {
  const requestBody = {
    priority,
  };
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items/${itemId}/priority`,
    options,
    ERROR_MESSAGE.SET_PRIORITY
  );
}

function updateComplete(userId, itemId) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items/${itemId}/toggle`,
    options,
    ERROR_MESSAGE.UPDATE_COMPLETE
  );
}

function updateContents(userId, itemId, contents) {
  const requestBody = {
    contents,
  };
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items/${itemId}`,
    options,
    ERROR_MESSAGE.UPDATE_CONTENT
  );
}

export {
  getUsers,
  addUser,
  deleteUser,
  getUser,
  updateComplete,
  deleteItem,
  createItem,
  updateContents,
  updatePriority,
  deleteAllTodoOfUser,
};
