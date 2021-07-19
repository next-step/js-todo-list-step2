import { FILTER } from "../const/TODO.js";

class Store {
  constructor() {
    this._users = [];
    this._user = {};
    this._selectedUserId = '';
    this._selectedFilterType = '';

    this._todos = [];
    this._todoList = [];
    this._totalCount = 0;
  }

  set users(updatedUsers) {
    this._users = updatedUsers;
  }

  set user(updatedUser) {
    this._user = updatedUser;
  }

  set selectedUserId(userId) {
    this._selectedUserId = userId ? userId : this._users[0]._id;
  }

  set selectedFilterType(filterType) {
    this._selectedFilterType = filterType;
  }

  set todos(updatedTodos) {
    
    if (updatedTodos === undefined) {
      const findIdx = this.users.findIndex(user => user._id === this.selectedUserId);
      updatedTodos = this.users[findIdx].todoList;
    }

    this._todos = updatedTodos;
    this._totalCount = updatedTodos.length;
  }

  set todoList(updatedTodoList) {
    this._todoList = updatedTodoList;
  }

  get users() {
    return this._users;
  }

  get user() {
    return this._user;
  }

  get selectedUserId() {
    return this._selectedUserId ? this._selectedUserId : this._users[0]._id;
  }

  get selectedFilterType() {
    return this._selectedFilterType;
  }

  get todos() {
    return this._todos;
  }

  get todosTotalCount() {
    return this.todos.length;
  }

  get todoList() {
    return this._todoList;
  }

  filter = {
    [FILTER.ALL]: () => this.todos,
    [FILTER.ACTIVE]: () => this.todos.filter(({ isCompleted }) => !isCompleted),
    [FILTER.COMPLETED]: () => this.todos.filter(({ isCompleted }) => isCompleted)
  }

  get filteredTodoList() {
    return this.filter[this.selectedFilterType]();
  }

  getTodoItem(itemId) {
    return this.todos.find(todo => todo._id === itemId)
  }
}

export default function() {
  return new Store();
}