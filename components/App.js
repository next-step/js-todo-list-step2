import TodoHeader from './todo-header.js';
import UserList from './user-list.js';
import TodoList from './todo-list.js';
import TodoInput from './todo-input.js';
import TodoFilter from './todo-filter.js';

import { getUsers } from '../api/users.js';
import {
  getTodoItems,
  toggleTodo,
  addTodoItem,
  updateTodoItem,
  updateTodoPriority,
  deleteTodoItem,
  allDeleteTodoItem,
} from '../api/todoApi.js';

export default class App {
  constructor() {
    this.todoHeader = new TodoHeader();
    this.userList = new UserList(this.changeUser.bind(this));
    this.todoInput = new TodoInput(this.addTodo.bind(this));
    this.todoFilter = new TodoFilter(
      this.allRemoveTodo.bind(this),
      this.updateFilteredTodoList.bind(this)
    );
    this.todoList = new TodoList(
      this.toggleTodo.bind(this),
      this.editTodo.bind(this),
      this.changePriority.bind(this),
      this.removeTodo.bind(this)
    );

    this.users = [];
    this.todos = [];
    this.filterdTodos = [];
    this.selectedUserName = '';
    this.init();
  }

  async init() {
    try {
      this.users = await getUsers();
      this.userList.setUsers(this.users);
      const defaultUserName = this.users[0].name;
      this.selectedUserName = defaultUserName;
      this.userList.selectUser(defaultUserName);
      this.todoHeader.setState(defaultUserName);

      this.todos = await getTodoItems(defaultUserName);
      this.updateFilteredTodoList();
    } catch (error) {
      alert(error.message);
    }
  }

  updateFilteredTodoList() {
    this.filterdTodos = this.getFiteredTodoList();
    this.todoList.setTodoList(this.filterdTodos);
    this.todoFilter.setState(this.filterdTodos.length);
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

  setTodoState(todoList = []) {
    try {
      this.todos = {
        ...this.todos,
        todoList,
      };
      this.updateFilteredTodoList();
    } catch (error) {
      alert(`setTodoState error: ${error.message}`);
    }
  }

  getFiteredTodoList() {
    return this.todos.todoList.filter((todo) => {
      if (location.hash === '#/active') {
        return !todo.isCompleted;
      }
      if (location.hash === '#/completed') {
        return todo.isCompleted;
      }
      return true;
    });
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
      alert(`addTodo error: ${error.message}`);
    }
  }

  async toggleTodo(targetId) {
    await toggleTodo(this.selectedUserName, targetId);
    const targetTodo = this.todos.todoList.find(
      (todo) => todo._id === targetId
    );
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

  async changePriority(itemId, priority) {
    const updatedTodo = await updateTodoPriority(
      this.selectedUserName,
      itemId,
      priority
    );
    const targetId = updatedTodo._id;
    const newTodos = this.makeNewTodoList('priority', targetId, priority);
    this.setTodoState(newTodos);
  }

  removeTodo(targetId) {
    try {
      allDeleteTodoItem(this.selectedUserName, targetId);
      this.setTodoState([]);
    } catch (error) {
      alert(`removeTodo error: ${error.message}`);
    }
  }

  allRemoveTodo() {
    try {
      console.log(this.todos);
      if (this.todos.todoList.length === 0) {
        throw new Error('삭제할 todo가 없습니다.');
      }
      if (confirm('정말로 전부 삭제하시겠습니까?')) {
        this.todos.todoList.forEach((todo) => {
          deleteTodoItem(this.selectedUserName, todo._id);
        });
        this.setTodoState([]);
      }
    } catch (error) {
      alert(`allRemoveTodo error: ${error.message}`);
    }
  }
}
