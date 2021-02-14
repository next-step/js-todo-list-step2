import { addTodo } from './addTodo.js';
import { checkTodo } from './checkTodo.js';
import { editTodo } from './editTodo.js';

const onEditMode = ({ target }) => {
    if(!target.classList.contains('label')) return;
    const originalVal = target.lastChild.textContent.trim();
    console.dir(target);
    console.log(originalVal);
    target.closest('li').classList.add('editing');
};


export const todoTrigger = () => {
    const $todoInput = document.querySelector('.new-todo');
    const $todoList = document.querySelector('.todo-list');

    $todoInput.addEventListener('keyup', addTodo);
    $todoList.addEventListener('click', checkTodo);
    $todoList.addEventListener('dblclick', onEditMode);
};