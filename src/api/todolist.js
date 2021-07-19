import { API } from '@utils/api.js';
import { BASE_URL } from '@constants/constants.js';

const URL = {
  getTodoList: (userId) => `${BASE_URL}/${userId}/items`,
  createTodoItem: (userId) => `${BASE_URL}/${userId}/items`,
  toggleTodoItem: (userId, itemId) => `${BASE_URL}/${userId}/items/${itemId}/toggle`,
  deleteAllItem: (userId) => `${BASE_URL}/${userId}/items`,
  deleteItem: (userId, itemId) => `${BASE_URL}/${userId}/items/${itemId}`,
  updateItemContents: (userId, itemId) => `${BASE_URL}/${userId}/items/${itemId}`,
  updateItemPriority: (userId, itemId) => `${BASE_URL}/${userId}/items/${itemId}/priority`,
};

const getTodoList = async (userId) => {
  try {
    const response = await API.get(URL.getTodoList(userId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Todo List Get Error: ${error}`);
  }
};

const createTodoItem = async (userId, contents) => {
  try {
    const response = await API.post(URL.createTodoItem(userId), contents);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Add Todo List Item Error:${error}`);
  }
};

const toggleTodoItem = async (userId, itemId) => {
  try {
    const response = await API.put(URL.toggleTodoItem(userId, itemId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Toggle Todo Item Error:${error}`);
  }
};

const deleteAllItem = async (userId) => {
  try {
    const response = await API.delete(URL.deleteAllItem(userId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Toggle Todo Item Error:${error}`);
  }
};

const deleteItem = async (userId, itemId) => {
  try {
    const response = await API.delete(URL.deleteItem(userId, itemId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Toggle Todo Item Error:${error}`);
  }
};

const updateItemContents = async (userId, itemId, contents) => {
  try {
    const response = await API.put(URL.updateItemContents(userId, itemId), contents);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Toggle Todo Item Error:${error}`);
  }
};

const updateItemPriority = async (userId, itemId, priority) => {
  try {
    const response = await API.put(URL.updateItemPriority(userId, itemId), priority);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Toggle Todo Item Error:${error}`);
  }
};

export const todoListService = {
  getTodoList,
  createTodoItem,
  toggleTodoItem,
  deleteAllItem,
  deleteItem,
  updateItemContents,
  updateItemPriority,
};
