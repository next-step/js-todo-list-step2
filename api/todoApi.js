import config from '../config/index.js';
import http from '../utils/apiRequest.js';

export const getTodoItems = async (userName) => {
  const todos = await http.get(`${config.baseUrl}/u/${userName}/item`);
  return todos;
};

export const addTodoItem = async (userName, contents) => {
  const todo = await http.post(
    `${config.baseUrl}/u/${userName}/item`,
    JSON.stringify({
      contents,
    })
  );
  return todo;
};

export const updateTodoItem = async (userName, itemId, contents) => {
  const todo = await http.put(
    `${config.baseUrl}/u/${userName}/item/${itemId}`,
    JSON.stringify({
      contents,
    })
  );
  return todo;
};

export const updateTodoPriority = async (userName, itemId, priority) => {
  const todo = await http.put(
    `${config.baseUrl}/u/${userName}/item/${itemId}/priority`,
    JSON.stringify({
      priority,
    })
  );
  return todo;
};

export const deleteTodoItem = async (userName, itemId) => {
  const todo = await http.delete(
    `${config.baseUrl}/u/${userName}/item/${itemId}`
  );
  return todo;
};

export const allDeleteTodoItem = async (userName, itemId) => {
  const todo = await http.delete(`${config.baseUrl}/u/${userName}/items`);
  return todo;
};

export const toggleTodo = async (userName, itemId) => {
  const todo = await http.put(
    `${config.baseUrl}/u/${userName}/item/${itemId}/toggle`
  );
  return todo;
};
