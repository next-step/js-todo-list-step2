import {loadUsers} from './components/userList/loadUsers.js';
import {userList} from './components/userList/userList.js'
import {todoList} from './components/todoList/todoList.js';
import {getCurrentUser} from './utils/localStorage.js';

export const todoApp = async () => {
  await loadUsers(getCurrentUser());
  userList();
  todoList();
};

window.onload = () => {
  todoApp();
};