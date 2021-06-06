import { todoItemTemplate } from '../templates.js';

export default class TodoList {
  constructor() {
    this.$todoList = document.querySelector('.todo-list');
  }

  render(todoItems) {
    const template = todoItems.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
  }
}
