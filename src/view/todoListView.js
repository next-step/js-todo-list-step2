'use strict';

import { $ } from '../utils/dom.js';
import { todoStore } from '../model/todoStore.js';
import { todoFitlerView } from '../view/todoFilterView.js';
import { todoItemTemplate, progressTemplate } from '../layout/templates.js';
class TodoListView {
  constructor() {
    this.$todoList = $('.todo-list');
  }

  render(items) {
    const filter = {
      all: () => items,
      active: () => items.filter(item => item.isCompleted === false),
      completed: () => items.filter(item => item.isCompleted === true),
    };
    const filteredItems = filter[todoStore.filterType]();
    this.$todoList.innerHTML = filteredItems.map(todoItemTemplate).join('');
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

  showProgress() {
    this.$todoList.innerHTML = progressTemplate();
  }
}

export const todoListView = new TodoListView();
