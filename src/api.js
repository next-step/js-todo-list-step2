import { DELETE, POST } from './constants.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

function getUserURL(userId) {
  return `${BASE_URL}/${userId}`;
}

function getTodoItemsURL(userId) {
  return `${BASE_URL}/${userId}/items`;
}

export async function getUsersData() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function getUserData(userId) {
  const userURL = getUserURL(userId);
  const response = await fetch(userURL);
  return response.json();
}

export async function addUserData(data = {}) {
  const response = await fetch(BASE_URL, {
    method: POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUserData(userId) {
  const userURL = getUserURL(userId);
  await fetch(userURL, {
    method: DELETE,
  });
}

export async function addTodoItemData(userId, data = {}) {
  const todoItemsURL = getTodoItemsURL(userId);
  const response = await fetch(todoItemsURL, {
    method: POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}
