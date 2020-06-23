import App from './App.js';

const username = 'ganeodolu';
const userArray = [];
const data = [];

new App({
  username,
  userArray,
  data,
  $targetUserTitle: document.querySelector('#user-title'),
  $targetUserList: document.querySelector('#user-list'),
  $targetTodoInput: document.querySelector('.new-todo'),
  $targetTodoList: document.querySelector('.todo-list'),
  $targetTodoCountContainer: document.querySelector('.count-container'),
  // $targetTodoCountCompleted: document.querySelector('.completed-count'),
});
