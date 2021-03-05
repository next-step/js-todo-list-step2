'use strict';

import { todoStore } from './store/todoStore';
import { TodoInputController } from './controller/todoInputController.js';
import { TodoInputView } from './view/todoInputView.js';

class TodoApp {
  constructor() {
    this.todoInputController = new TodoInputController();
    this.todoInputView = new TodoInputView();
  }

  init() {}
}
