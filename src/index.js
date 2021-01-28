import { addUser } from './components/addUser.js';
import { loadUser } from './components/loadUser.js';

export const todoApp = () => {
  loadUser();
  addUser();
};

window.onload = () => {
  todoApp();
};
