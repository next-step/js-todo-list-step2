import TodoHeader from './todo-header.js';
import UserList from './user-list.js';
import TodoList from './todo-list.js';
import TodoInput from './todo-input.js';

import { getUsers } from '../api/users.js';
import {
  getTodoItems,
  toggleTodo,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '../api/todoApi.js';

export default class App {
  constructor() {
    this.todoHeader = new TodoHeader();
    this.userList = new UserList(this.changeUser.bind(this));
    this.todoInput = new TodoInput(this.addTodo.bind(this));
    this.todoList = new TodoList(
      this.toggleTodo.bind(this),
      this.editTodo.bind(this),
      this.removeTodo.bind(this)
    );

    this.users = [];
    this.todos = [];
    this.selectedUserName = '';
    this.init();
  }

  async init() {
    try {
      this.users = await getUsers();
      this.userList.setUsers(this.users);
      const defaultUserName = this.users[this.users.length - 4].name;
      this.selectedUserName = defaultUserName;
      this.userList.selectUser(defaultUserName);
      this.todoHeader.setState(defaultUserName);

      this.todos = await getTodoItems(defaultUserName);
      this.todoList.setTodoList(this.todos.todoList);
    } catch (error) {
      alert(error);
    }
  }

  async changeUser(selectedUser) {
    try {
      this.selectedUserName = selectedUser;
      this.userList.selectUser(selectedUser);
      this.todoHeader.setState(selectedUser);
      const todos = await getTodoItems(selectedUser);
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
      this.todoList.setTodoList(todoList);
    } catch (error) {
      alert(error);
    }
  }

  makeNewTodoList(property, targetId, newValue) {
    const newTodos = this.todos.todoList.map((todo) => {
      if (todo._id === targetId) {
        todo[property] = newValue;
      }
      return todo;
    });
    return newTodos;
  }

  async addTodo(contents) {
    try {
      const newTodoItem = await addTodoItem(this.selectedUserName, contents);
      const todoList = this.todos.todoList || [];
      this.setTodoState(todoList.concat(newTodoItem));
    } catch (error) {
      alert(error.message);
    }
  }

  async toggleTodo(targetId) {
    await toggleTodo(this.selectedUserName, targetId);
    const targetTodo = this.todos.todoList.find((todo) => {
      return todo._id === targetId;
    });
    const newValue = !targetTodo.isCompleted;
    const newTodos = this.makeNewTodoList('isCompleted', targetId, newValue);
    this.setTodoState(newTodos);
  }

  async editTodo(itemId, contents) {
    const updatedTodo = await updateTodoItem(
      this.selectedUserName,
      itemId,
      contents
    );
    const targetId = updatedTodo._id;
    const newTodos = this.makeNewTodoList('contents', targetId, contents);
    this.setTodoState(newTodos);
  }

  removeTodo(targetId) {
    try {
      deleteTodoItem(this.selectedUserName, targetId);
      const newTodos = this.todos.todoList.filter(
        (todo) => todo._id !== targetId
      );
      this.setTodoState(newTodos);
    } catch (error) {
      alert(error.message);
    }
  }
}
