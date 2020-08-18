import TodoHeader from './todo-header.js';
import UserList from './user-list.js';
import TodoList from './todo-list.js';
import TodoInput from './todo-input.js';

import { getUsers } from '../api/users.js';
import {
  getTodoItems,
  toggleTodo,
  addTodoItem,
  deleteTodoItem,
} from '../api/todoApi.js';

export default class App {
  constructor() {
    this.todoHeader = new TodoHeader();
    this.userList = new UserList(this.changeUser.bind(this));
    this.todoList = new TodoList(
      this.toggleTodo.bind(this),
      this.editTodo.bind(this),
      this.removeTodo.bind(this)
    );
    this.todoInput = new TodoInput(this.addTodo.bind(this));

    this.selectedUserName = '';
    this.users = [];
    this.todos = [];
    this.init();
  }

  async init() {
    this.users = await getUsers();
    this.userList.setUsers(this.users);
    const defaultUserName = this.users[0].name;
    this.selectedUserName = defaultUserName;
    this.userList.selectUser(defaultUserName);
    this.todoHeader.setState(defaultUserName);

    this.todos = await getTodoItems(this.selectedUserName);
    this.todoList.setTodos(this.todos.todoList);
  }

  async changeUser(selectedUser) {
    try {
      this.userList.selectUser(selectedUser);
      this.selectedUserName = selectedUser;
      this.todoHeader.setState(selectedUser);
      const todos = await getTodoItems(this.selectedUserName);
      this.setTodoState(todos.todoList);
    } catch (error) {
      alert(error);
    }
  }

  setTodoState(todoList) {
    try {
      this.todos = {
        ...this.todos,
        todoList,
      };
      this.todoList.setTodos(todoList);
    } catch (error) {
      alert(error);
    }
  }

  async addTodo(contents) {
    const newTodoItem = await addTodoItem(this.selectedUserName, contents);
    const todoList = this.todos.todoList || [];
    todoList.push(newTodoItem);
    this.setTodoState(todoList);
  }

  async toggleTodo(targetId) {
    await toggleTodo(this.selectedUserName, targetId);
    const newTodos = this.todos.todoList.map((todo) => {
      if (todo._id === targetId) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    this.setTodoState(newTodos);
  }

  editTodo(targetId, changeValue) {
    const newTodos = this.todos.todoList.map((todo) => {
      if (todo._id === targetId) {
        todo.isCompleted = !todo.isCompleted;
        if (changeValue && todo.text !== changeValue) {
          todo.text = changeValue;
        }
      }
      return todo;
    });
    this.setTodoState(newTodos);
  }

  removeTodo(targetId) {
    deleteTodoItem(this.selectedUserName, targetId);
    const newTodos = this.todos.todoList.filter(
      (todo) => todo._id !== targetId
    );
    this.setTodoState(newTodos);
  }
}
