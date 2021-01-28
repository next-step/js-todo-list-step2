import { loadUsers } from './utils/loadUsers.js';

export const todoApp = () => {
  loadUsers();
};

window.onload = () => {
  todoApp();
};
