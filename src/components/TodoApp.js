import { FILTER, LOCAL_DB_KEY } from '../constants/constants.js';
import localDB from '../utils/localStorage.js';

// state
import TodoState from '../store/todoState.js';
import FilterState from '../store/filterState.js';

// components
import TodoInput from './TodoList/TodoInput.js';
import TodoList from './TodoList/TodoList.js';
import TodoCount from './TodoList/TodoCount.js';

export default class TodoApp {
  constructor() {
    // state
    this.todoState = TodoState;
    this.filterState = FilterState;

    // components
    new TodoInput({ setTodoList: this.setTodoList.bind(this) });
    this.todoList = new TodoList({ setTodoList: this.setTodoList.bind(this) });
    this.todoCount = new TodoCount({ setFilter: this.setFilter.bind(this) });

    this._init();
  }

  setFilter(updatedFilter) {
    this.filterState.set(updatedFilter);
    this._render();
  }

  setTodoList(updatedTodoList) {
    this.todoState.set(updatedTodoList);
    localDB.setData(LOCAL_DB_KEY, updatedTodoList);
    this._render();
  }

  _render() {
    const filter = this.filterState.get();
    const todoList = this._getFilteredTodoList(filter);

    this.todoList.render(todoList);
    this.todoCount.renderCount(todoList.length);
  }

  _getFilteredTodoList(filter) {
    return {
      [FILTER.ALL]: this.todoState.get(),
      [FILTER.ACTIVE]: this.todoState.get().filter((todoItem) => !todoItem.isDone),
      [FILTER.COMPLETED]: this.todoState.get().filter((todoItem) => todoItem.isDone),
    }[filter];
  }

  _init() {
    // state 초기화 및 rendering
    const DBData = localDB.getData(LOCAL_DB_KEY);
    localDB.setData(LOCAL_DB_KEY, JSON.parse(DBData));
    this.todoState.set(JSON.parse(DBData));

    this._render();
  }
}
