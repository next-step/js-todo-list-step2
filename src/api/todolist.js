import { API } from '../utils/api.js';
import { BASE_URL } from '../constants/constants.js';

export const getTodoList = async (userId) => {
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

export const createTodoItem = async (userId, contents) => {
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
