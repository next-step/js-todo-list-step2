import { BASE_URL } from './constants.js';

const fetch_retry = async (url, options, n) => {
  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('error');
    }
    return await response.json();
  } catch (err) {
    if (n < 1) {
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

export { getUsers };
