import TodoHeader from './todo-header.js';
import UserList from './user-list.js';
import TodoList from './todo-list.js';

import { getUsers } from '../api/users.js';
import { getTodoItems, toggleTodo, deleteTodoItem } from '../api/todoApi.js';

export default class App {
  constructor() {
    this.todoHeader = new TodoHeader();
    this.userList = new UserList(this.changeUser.bind(this));
    this.todoList = new TodoList(
      this.toggleTodo.bind(this),
      this.editTodo.bind(this),
      this.removeTodo.bind(this)
    );

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

    this.todos = await getTodoItems(defaultUserName);
    this.todoList.setTodos(this.todos.todoList);
  }

  render() {
    console.log(this.todos.todoList);
    this.todoList.setTodos(this.todos.todoList);
  }

  async changeUser(selectedUser) {
    try {
      this.userList.selectUser(selectedUser);
      this.selectedUserName = selectedUser;
      this.todoHeader.setState(selectedUser);
      const todos = await getTodoItems(selectedUser);
      this.setTodoState(todos);
      this.todoList.setTodos(this.todos.todoList);
    } catch (error) {
      alert(error);
    }
  }

  setTodoState(todoList) {
    this.todos = {
      ...this.todos,
      todoList,
    };
    this.render();
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
