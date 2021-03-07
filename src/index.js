'use strict';

import TodoApp from './components/todoApp/todoApp.js';
import UserList from './components/userList/userList.js';

const todoApp = new TodoApp();
const userList = new UserList();
todoApp.init();
userList.init();
