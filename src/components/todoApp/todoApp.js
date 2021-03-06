'use strict';

import TodoInputController from './controller/todoInputController.js';
import TodoListController from './controller/todoListController.js';
import TodoFilterController from './controller/todoFilterController.js';

class TodoApp {
  init() {
    const todoInputController = new TodoInputController();
    const todoListController = new TodoListController();
    const todoFilterController = new TodoFilterController();
    todoListController.init();
  }
}

export default TodoApp;
