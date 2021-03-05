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
}

export const todoListView = new TodoListView();
