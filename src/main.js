'use strict';

import TodoInputController from './controller/todoInputController.js';
import TodoListController from './controller/todoListController.js';

// todoStore.init();
const todoInputController = new TodoInputController();
const todoListController = new TodoListController();
todoListController.init();

console.log('테스트');
