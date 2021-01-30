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

const triggerDobuleClickTodoItem = ({ target }) => {
  if (target.className !== 'label') {
    return;
  }
  const originalValue = target.innerText;

  target.closest('li').classList.add('editing');
  target
    .closest('li')
    .addEventListener('keyup', (event) => editTodo(event, originalValue));
};

export const todoList = () => {
  const $newTodo = document.querySelector('.new-todo');
  const $todoList = document.querySelector('.todo-list');

  $newTodo.addEventListener('keyup', addTodo);
  $todoList.addEventListener('click', triggerClickTodoItem);
  $todoList.addEventListener('dblclick', triggerDobuleClickTodoItem);
};
