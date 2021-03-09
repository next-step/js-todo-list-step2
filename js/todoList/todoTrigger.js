import { addTodo } from './addTodo.js';
import { checkTodo } from './checkTodo.js';
import { editTodo } from './editTodo.js';
import { deleteTodo, deleteTodoAll } from './deleteTodo.js';
import { filterTodo } from './filterTodo.js';

const onEditMode = ({ target }) => {
    if(!target.classList.contains('label')) return;
    const originalVal = target.lastChild.textContent.trim();
    const $li = target.closest('li');
    $li.classList.add('editing');
    $li.addEventListener('keyup', (event) => editTodo(event, originalVal));
};

export const todoTrigger = () => {
    const $todoInput = document.querySelector('.new-todo');
    const $todoList = document.querySelector('.todo-list');
    const $deleteAllBtn = document.querySelector('.clear-completed');
    const $bottomMenu = document.querySelector('.count-container');

    $todoInput.addEventListener('keyup', addTodo);
    $todoList.addEventListener('click', checkTodo);
    $todoList.addEventListener('dblclick', onEditMode);
    $todoList.addEventListener('click', deleteTodo);

    $deleteAllBtn.addEventListener('click', deleteTodoAll);

    $bottomMenu.addEventListener('click', filterTodo);
};
