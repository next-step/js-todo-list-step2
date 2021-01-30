import { addTodo } from './addTodo.js';
import { toggleTodo } from './toggleTodo.js';
import { deleteTodo } from './deleteTodo.js';
import { editTodo } from './editTodo.js';

const triggerClickTodoItem = ({ target }) => {
  const classList = {
    toggle: toggleTodo,
    destroy: deleteTodo,
  };

  return classList[target.className] && classList[target.className](target);
};

export const todoList = () => {
  const $newTodo = document.querySelector('.new-todo');
  const $todoList = document.querySelector('.todo-list');

  $newTodo.addEventListener('keyup', addTodo);
  $todoList.addEventListener('dblclick', editTodo);
  $todoList.addEventListener('click', triggerClickTodoItem);
};
