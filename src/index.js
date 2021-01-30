import { loadUsers } from './components/userList/loadUsers.js';
import { userList } from './components/userList/userList.js';
import { todoList } from './components/todoList/todoList.js';

export const todoApp = async () => {
  await loadUsers();
  userList();
  todoList();
};

window.onload = () => {
  todoApp();
};
