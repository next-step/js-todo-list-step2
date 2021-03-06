'use strict';

import { $ } from '../utils/dom.js';
import { todoTemplate } from '../layout/templates.js';
import { todoFitlerView } from '../view/todoFilterView.js';
class TodoListView {
  constructor() {
    this.$todoList = $('.todo-list');
  }

  render(items) {
    this.$todoList.innerHTML = items.map(todoTemplate).join('');
    todoFitlerView.showCount();
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

  clear() {
    this.$todoList.innerHTML = '';
    todoFitlerView.showCount();
  }
}

export const todoListView = new TodoListView();
