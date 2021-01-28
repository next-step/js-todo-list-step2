import { addUser } from './components/addUser.js';
import { loadTodo } from './components/loadTodo.js';
import { loadUsers } from './components/loadUsers.js';

export const todoApp = () => {
  loadUsers();
  addUser();
  loadTodo();
};

window.onload = () => {
  todoApp();
};
