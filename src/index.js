import { loadUsers } from './components/userList/loadUsers.js';
import { userList } from './components/userList/userList.js';

export const todoApp = () => {
  loadUsers();
  userList();
};

window.onload = () => {
  todoApp();
};
