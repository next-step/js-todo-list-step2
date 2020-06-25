import App from './App.js';
import { DEFAULT_USER } from './util/constants.js';

const username = DEFAULT_USER;
const userArray = [];

new App({
  username,
  userArray,
  $targetUserContainer: document.querySelector('.user-container'),
  $targetUserRegister: document.querySelector('.user-register'),
  $targetTodoInput: document.querySelector('.new-todo'),
  $targetTodoList: document.querySelector('.todo-list'),
  $targetTodoCountContainer: document.querySelector('.count-container'),
});
