import { PATH } from "./path.js";
import { GET, POST, DELETE, PUT } from "./http.js";

export const getUsersAPI = () => GET(`${PATH}/users`);
export const getUserAPI = (userId) => GET(`${PATH}/users/${userId}`);
export const createUserAPI = (name) => POST(`${PATH}/users`, name);
export const deleteUserAPI = (userId) => DELETE(`${PATH}/users/${userId}`);
export const getUserTodoAPI = (userId) => GET(`${PATH}/users/${userId}/items/`);
export const createTodoAPI = (userId, data) =>
  POST(`${PATH}/users/${userId}/items/`, data);
export const deleteTodoAPI = (userId, itemId) =>
  DELETE(`${PATH}/users/${userId}/items/${itemId}`);
export const deleteAllTodoAPI = (userId) =>
  DELETE(`${PATH}/users/${userId}/items/`);
export const updateTodoAPI = (userId, itemId, contents) =>
  PUT(`${PATH}/users/${userId}/items/${itemId}`, contents);
export const updateTodoPriorityAPI = (userId, itemId, priority) =>
  PUT(`${PATH}/users/${userId}/items/${itemId}/priority`, priority);
export const updateTodoCompletedAPI = (userId, itemId) =>
  PUT(`${PATH}/users/${userId}/items/${itemId}/toggle`);
