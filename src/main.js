'use strict';

import TodoInputController from './controller/todoInputController.js';
import TodoListController from './controller/todoListController.js';
import TodoFilterController from './controller/todoFilterController.js';

// todoStore.init();
const todoInputController = new TodoInputController();
const todoListController = new TodoListController();
const todoFilterController = new TodoFilterController();
todoListController.init();

console.log('테스트');
