'use strict';

import { todoListStore } from '../store/store.js';
import { todoInputView } from '../view/todoInputView.js';
import { todoListView } from '../view/todoListView.js';
import { $ } from '../../../utils/dom.js';
import {
  KeyValidator,
  ElementValidator,
} from '../../../validator/validator.js';
import { uuid } from '../../../utils/utils.js';

class TodoInputController {
  constructor() {
    // this.todoInputView = new TodoInputView();
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

    const newTodoItem = {
      id: uuid(),
      contents: this.$todoInput.value,
      priority: 'NONE',
      isCompleted: false,
    };
    this.addNewItem(newTodoItem);
  };

  addNewItem(todoItem) {
    todoListStore.push(todoItem);
    todoListView.render(todoListStore.getItemsByFilter());
    todoInputView.clear();
  }
}

export default TodoInputController;
