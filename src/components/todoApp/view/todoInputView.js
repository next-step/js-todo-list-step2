'use strict';

import { $ } from '../../../utils/dom.js';

class TodoInputView {
  constructor() {
    this.$todoInput = $('.new-todo');
  }

  clear() {
    this.$todoInput.value = '';
  }
}

export const todoInputView = new TodoInputView();
