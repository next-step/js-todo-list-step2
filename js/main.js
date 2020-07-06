import App from './App.js';

new App({
  username: '',
  userArray: [],
  $targetUserTitle: document.querySelector('#user-title'),
  $targetUserList: document.querySelector('#user-list'),
  $targetUserRegister: document.querySelector('.user-register'),
  $targetTodoInput: document.querySelector('.new-todo'),
  $targetTodoList: document.querySelector('.todo-list'),
  $targetTodoCountContainer: document.querySelector('.count-container'),
});
