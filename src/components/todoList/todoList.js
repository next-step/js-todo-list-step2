import { addTodo } from './addTodo.js';

export const todoList = () => {
  const $newTodo = document.querySelector('.new-todo');

  $newTodo.addEventListener('keyup', addTodo);
};
