'use strict';

import { $ } from '../utils/dom.js';
import { API } from '../api/api.js';
import { userStore } from '../model/userStore.js';
import { todoInputView } from '../view/todoInputView.js';
import { todoListController } from './todoListController.js';
import { KeyValidator, ElementValidator } from '../validator/validator.js';

class TodoInputController {
  constructor() {
    this.$todoInput = $('.new-todo');
    this.$todoInput.addEventListener('keyup', this.onKeyUpTodoInput);
  }

  onKeyUpTodoInput = event => {
    if (
      KeyValidator.isNotEnter(event.key) ||
      ElementValidator.isEmpty(this.$todoInput)
    ) {
      return;
    }
    this.addNewItem(event.target.value.trim());
  };

  // 2번 실행되는 버그 있는듯...
  async addNewItem(text) {
    await API.addTodoItem(userStore.currentUserID, text);
    todoListController.loadUserItems(userStore.currentUserID);
    todoInputView.clear();
  }

  init() {}
}

export const todoInputController = new TodoInputController();
