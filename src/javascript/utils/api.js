import { BASE_URL, RETRY_COUNT } from './constants.js';

const fetch_retry = async (url, options, n = RETRY_COUNT) => {
  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('error');
    }
    return await response.json();
  } catch (err) {
    console.log(n);
    if (n <= 1) {
      throw err;
    }
    return await fetch_retry(url, options, n - 1);
  }
};

function getUsers() {
  return fetch_retry(`${BASE_URL}/api/users`);
}

function addTodo() {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contents),
  };
  // return fetch_retry()
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

export { getUsers, addUser, deleteUser };
