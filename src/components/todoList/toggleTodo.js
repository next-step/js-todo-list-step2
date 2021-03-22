import { API } from '../../api/api.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

export const toggleTodo = async (target) => {
  const currentUser = getCurrentUser();
  const currentTarget = target.closest('li').id;

  await API.toggleTodo(currentUser, currentTarget);
  loadTodos(currentUser);
};
