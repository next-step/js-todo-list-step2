import { DELETE, POST, PUT } from './constants.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

function getUserURL(userId) {
  return `${BASE_URL}/${userId}`;
}

function getTodoListURL(userId) {
  return `${BASE_URL}/${userId}/items`;
}

function getTodoItemToggleURL(userId, itemId) {
  return `${BASE_URL}/${userId}/items/${itemId}/toggle`;
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
  const response = await fetch(userURL, {
    method: DELETE,
  });
  return response.json();
}

export async function getTodoListData(userId) {
  const todoListURL = getTodoListURL(userId);
  const response = await fetch(todoListURL);
  return response.json();
}

export async function addTodoItemData(userId, data = {}) {
  const todoListURL = getTodoListURL(userId);
  const response = await fetch(todoListURL, {
    method: POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateTodoItemToggleData(userId, itemId, data = {}) {
  const todoItemToggleURL = getTodoItemToggleURL(userId, itemId);
  const response = await fetch(todoItemToggleURL, {
    method: PUT,
    body: JSON.stringify(data),
  });
  return response.json();
}
