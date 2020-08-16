import TodoHeader from './todo-header.js';
import UserList from './user-list.js';
import TodoList from './todo-list.js';

import { getUsers } from '../api/users.js';
import { getTodoItems } from '../api/todoApi.js';

export default class App {
  constructor() {
    this.todoHeader = new TodoHeader();
    this.userList = new UserList(this.changeUser.bind(this));
    this.todoList = new TodoList();

    this.users = [];
    this.todos = [];
    this.init();
  }

  async init() {
    this.users = await getUsers();
    this.userList.setUsers(this.users);
    const defaultUserName = this.users[0].name;
    this.userList.selectUser(defaultUserName);
    this.todoHeader.setState(defaultUserName);

    this.todos = await getTodoItems(defaultUserName);
    this.todoList.setTodos(this.todos.todoList);
  }

  async changeUser(selectedUser) {
    try {
      this.userList.selectUser(selectedUser);
      this.todoHeader.setState(selectedUser);
      this.todos = await getTodoItems(selectedUser);
      this.todoList.setTodos(this.todos.todoList);
    } catch (error) {
      alert(error);
    }
  }
}
