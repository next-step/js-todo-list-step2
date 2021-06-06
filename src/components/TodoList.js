import { todoItemTemplate } from '../templates.js';

export default class TodoList {
  constructor({ onToggle }) {
    this.$todoList = document.querySelector('.todo-list');

    this.$todoList.addEventListener('click', (event) => this.toggleTodoItem(event, onToggle));
  }

  render(todoList) {
    const template = todoList.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
  }

  toggleTodoItem(event, onToggle) {
    const toggleButtonTarget = event.target;
    if (!toggleButtonTarget.classList.contains('toggle')) return;
    onToggle(toggleButtonTarget.id);
  }
}
