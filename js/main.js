import App from './App.js';

const data = [];
new App({
  data,
  $targetTodoInput: document.querySelector('.new-todo'),
  $targetTodoList: document.querySelector('.todo-list'),
});
