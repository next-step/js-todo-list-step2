import { FILTER, LOCAL_DB_KEY } from '../constants/constants.js';
import { getTodoList } from '../api/todolist.js';

// state
import TodoState from '../store/todoState.js';
import FilterState from '../store/filterState.js';
import UserState from '../store/UserState.js';

// components
import UserList from './UesrList/UserList.js';
import TodoInput from './TodoList/TodoInput.js';
import TodoList from './TodoList/TodoList.js';
import TodoCount from './TodoList/TodoCount.js';

export default class TodoApp {
  constructor() {
    // state
    this.todoState = TodoState;
    this.filterState = FilterState;
    this.userState = UserState;

    // components
    new TodoInput({ setTodoList: this.setTodoList.bind(this) });
    this.todoList = new TodoList({ setTodoList: this.setTodoList.bind(this) });
    this.todoCount = new TodoCount({ setFilter: this.setFilter.bind(this) });
    this.userList = new UserList({ setUser: this.setUser.bind(this) });
  }

  setFilter(updatedFilter) {
    this.filterState.set(updatedFilter);
    this._render();
  }

  setTodoList(updatedTodoList) {
    this.todoState.set(updatedTodoList);
    this._render();
  }

  setUser(updateduser) {
    this.userState.set(updateduser);
    this._render();
  }

  async _render() {
    const filter = this.filterState.get();

    let todoList = await getTodoList(this.userState.get().userId);
    // console.log(todoList);
    // todoList = this._getFilteredTodoList(filter);

    this.todoList.render(todoList);
    this.todoCount.renderCount(todoList.length);
  }

  _getFilteredTodoList(filter) {
    console.log(filter);
    return {
      [FILTER.ALL]: this.todoState.get(),
      [FILTER.ACTIVE]: this.todoState.get().filter((todoItem) => !todoItem.isDone),
      [FILTER.COMPLETED]: this.todoState.get().filter((todoItem) => todoItem.isDone),
    }[filter];
  }
}
