import { loadTodos } from '../todoList/loadTodos.js';
import { loadUsers } from './loadUsers.js';

export const selectUser = (target) => {
  const userId = target.id;

  loadTodos(userId);
  loadUsers(userId);
};
