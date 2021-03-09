import { loadTodos } from '../todoList/loadTodos.js';
import { loadUsers } from './loadUsers.js';

export const selectUser = async (target) => {
  const userId = target.id;

  await loadTodos(userId);
  loadUsers(userId);
};
