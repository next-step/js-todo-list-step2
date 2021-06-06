import { todoItemTemplate } from '../templates.js';

export default class TodoList {
  constructor({ onToggle, onRemove }) {
    this.$todoList = document.querySelector('.todo-list');

    this.$todoList.addEventListener('click', (event) => this.toggleTodoItem(event, onToggle));
    this.$todoList.addEventListener('click', (event) => this.removeTodoItem(event, onRemove));
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

  removeTodoItem(event, onRemove) {
    const deleteButtonTarget = event.target;
    if (!deleteButtonTarget.classList.contains('destroy')) return;
    onRemove(deleteButtonTarget.id);
  }
}
