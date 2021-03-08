import userList from './userList.js';
import { todoApp } from './todoApp.js';
import { todoList } from './todoList.js';
import { todoStatus } from './todoStatus.js';
import { todoInput } from './todoInput.js';

userList().init();
todoApp(todoInput, todoList, todoStatus).init();
