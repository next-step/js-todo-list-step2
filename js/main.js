import App from './App.js';

const username = 'ganeodolu';
const userArray = [];

new App({
  username,
  userArray,
  $targetUserContainer: document.querySelector('.user-container'),
  $targetTodoInput: document.querySelector('.new-todo'),
  $targetTodoList: document.querySelector('.todo-list'),
  $targetTodoCountContainer: document.querySelector('.count-container'),
});
