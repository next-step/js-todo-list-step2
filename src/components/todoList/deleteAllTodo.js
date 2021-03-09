import { API } from '../../api/api.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

export const deleteAllTodo = async () => {
  const currentUser = getCurrentUser();

  await API.deleAllTodo(currentUser);
  loadTodos(currentUser);
};
