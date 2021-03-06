'use strict';

import { $ } from '../utils/dom.js';
import { todoTemplate } from '../layout/templates.js';
class TodoListView {
  constructor() {
    this.$todoList = $('.todo-list');
  }

  render(items) {
    this.$todoList.innerHTML = items.map(todoTemplate).join('');
  }

  activateEditMode(target) {
    target.classList.add('editing');
  }

  deactivateEditMode(target) {
    const $editInput = $('.edit', target);
    const text = $('.todo-item__contents', target).innerText;
    $editInput.value = text;
    target.classList.remove('editing');
  }

  editItem(item, text) {
    const $label = $('.todo-item__contents', item);
    $label.innerText = text;
  }

  confirm(message) {
    return confirm(message);
  }
}

export const todoListView = new TodoListView();
