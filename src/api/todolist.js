import { API } from '../utils/api.js';
import { BASE_URL } from '../constants/constants.js';

const getTodoList = async (userId) => {
  try {
    const response = await API.get(`${BASE_URL}/${userId}/items`);
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
    const response = await API.post(`${BASE_URL}/${userId}/items`, contents);
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
    // 	/api/users/:userId/items/:itemId/toggle
    const response = await API.put(`${BASE_URL}/${userId}/items/${itemId}/toggle`);
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
    // 	/api/users/:userId/items/
    const response = await API.delete(`${BASE_URL}/${userId}/items`);
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
    // 	/api/users/:userId/items/:itemId
    const response = await API.delete(`${BASE_URL}/${userId}/items/${itemId}`);
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
    // /api/users/:userId/items/:itemId
    const response = await API.put(`${BASE_URL}/${userId}/items/${itemId}`, contents);
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
    // /api/users/:userId/items/:itemId/priority
    const response = await API.put(`${BASE_URL}/${userId}/items/${itemId}/priority`, priority);
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
