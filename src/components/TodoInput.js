import { ENTER } from '../constants.js';

export default class TodoInput {
  constructor({ onAdd }) {
    this.$todoInput = document.querySelector('.new-todo');

    this.$todoInput.addEventListener('keydown', (event) => this.addTodoItem(event, onAdd));
  }

  addTodoItem(event, onAdd) {
    if (event.key !== ENTER) return;

    const todoInputTarget = event.target;
    if (todoInputTarget.value === '') return;

    onAdd(todoInputTarget.value);
    todoInputTarget.value = '';
  }
}
