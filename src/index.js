import { loadUser } from './components/loadUser.js';

export const todoApp = () => {
  loadUser();
};

window.onload = () => {
  todoApp();
};
