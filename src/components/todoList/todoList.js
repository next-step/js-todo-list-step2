import { addTodo } from './addTodo.js';

export const todoList = (currentUser) => {
  const $newTodo = document.querySelector('.new-todo');

  $newTodo.addEventListener('keyup', (e) => addTodo(e, currentUser));
};
