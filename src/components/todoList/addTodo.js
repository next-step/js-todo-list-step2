import { API } from '../../api/api.js';
import { MIMUN_TODO_LENGTH } from '../../constant/todo.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

export const addTodo = async ({ target, key }) => {
  if (key !== 'Enter' || target.value.length < MIMUN_TODO_LENGTH) {
    return;
  }
  const currentUser = getCurrentUser();
  await API.addTodo(target.value, currentUser);
  await loadTodos(currentUser);
  target.value = '';
};
