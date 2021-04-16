import { BASE_URL, RETRY_COUNT } from './constants.js';

const fetch_retry = async (url, options, n = RETRY_COUNT) => {
  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('error');
    }
    return await response.json();
  } catch (err) {
    if (n <= 1) {
      throw err;
    }
    return await fetch_retry(url, options, n - 1);
  }
};

function getUsers() {
  return fetch_retry(`${BASE_URL}/api/users`);
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
  return fetch_retry(`${BASE_URL}/api/users/${userId}/items`, options);
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
  return fetch_retry(`${BASE_URL}/api/users`, options);
}

function deleteUser(userId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(`${BASE_URL}/api/users/${userId}`, options);
}

function getUser(userId) {
  return fetch_retry(`${BASE_URL}/api/users/${userId}`);
}

function deleteItem(userId, itemId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items/${itemId}`,
    options
  );
}

function updateComplete(userId, itemId) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch_retry(
    `${BASE_URL}/api/users/${userId}/items/${itemId}/toggle`,
    options
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
    options
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
};
