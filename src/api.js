import { DELETE, POST, PUT } from './constants.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

function getUserURL(userId) {
  return `${BASE_URL}/${userId}`;
}

function getTodoListURL(userId) {
  return `${BASE_URL}/${userId}/items`;
}

function getTodoItemURL(userId, itemId) {
  return `${BASE_URL}/${userId}/items/${itemId}`;
}

function getTodoItemToggleURL(userId, itemId) {
  return `${BASE_URL}/${userId}/items/${itemId}/toggle`;
}

function getTodoItemPriorityURL(userId, itemId) {
  return `${BASE_URL}/${userId}/items/${itemId}/priority`;
}

export async function getUsersData() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getUserData(userId) {
  try {
    const userURL = getUserURL(userId);
    const response = await fetch(userURL);
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function addUserData(data = {}) {
  try {
    const response = await fetch(BASE_URL, {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUserData(userId) {
  try {
    const userURL = getUserURL(userId);
    const response = await fetch(userURL, {
      method: DELETE,
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getTodoListData(userId) {
  try {
    const todoListURL = getTodoListURL(userId);
    const response = await fetch(todoListURL);
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function removeTodoListData(userId) {
  try {
    const todoListURL = getTodoListURL(userId);
    const response = await fetch(todoListURL, {
      method: DELETE,
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function addTodoItemData(userId, data = {}) {
  try {
    const todoListURL = getTodoListURL(userId);
    const response = await fetch(todoListURL, {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function toggleTodoItemData(userId, itemId) {
  try {
    const todoItemToggleURL = getTodoItemToggleURL(userId, itemId);
    const response = await fetch(todoItemToggleURL, {
      method: PUT,
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function removeTodoItemData(userId, itemId) {
  try {
    const todoItemURL = getTodoItemURL(userId, itemId);
    const response = await fetch(todoItemURL, {
      method: DELETE,
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function updateTodoItemData(userId, itemId, data = {}) {
  try {
    const todoItemURL = getTodoItemURL(userId, itemId);
    const response = await fetch(todoItemURL, {
      method: PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function setTodoItemPriorityData(userId, itemId, data = {}) {
  try {
    const todoItemPriorityURL = getTodoItemPriorityURL(userId, itemId);
    const response = await fetch(todoItemPriorityURL, {
      method: PUT,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('유효하지 않은 URL');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}
