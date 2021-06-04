import api from './api.js';
import { showError } from './error.js';

const toggleTodo = async (userId, itemId) => {
  const response = await api.toggleTodoItem(userId, itemId);
  if (response.isError) {
    return showError(response.data);
  }
  return;
};

const removeTodo = async (userId, itemId) => {
  const response = await api.deleteTodoItem(userId, itemId);
  if (response.isError) {
    return showError(response.data);
  }
  return;
};

const changeTodo = async (userId, itemId, className, getNewTodos) => {
  const callback = { toggle: toggleTodo, destroy: removeTodo }[className];
  if (!callback) return;

  await callback(userId, itemId);

  return getNewTodos(userId);
};

export { changeTodo };
