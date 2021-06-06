import { FILTER, LOCAL_DB_KEY } from '../constants/constants.js';
import { getTodoList } from '../api/todolist.js';

// state
import UserState from '../store/UserState.js';
import TodoState from '../store/todoState.js';
import FilterState from '../store/filterState.js';

// components
import UserList from './UesrList/UserList.js';
import TodoInput from './TodoList/TodoInput.js';
import TodoCount from './TodoList/TodoCount.js';
import TodoList from './TodoList/TodoList.js';

export default class TodoApp {
  constructor() {
    // state
    this.todoState = TodoState;
    this.filterState = FilterState;
    this.userState = UserState;

    this.todoState.subscribe(this._render.bind(this));
    this.filterState.subscribe(this._render.bind(this));
    this.userState.subscribe(this._render.bind(this));

    return (async () => {
      // components
      this.userList = await new UserList({ userState: this.userState, todoState: this.todoState });
      new TodoInput({ userState: this.userState });
      this.todoList = new TodoList({ userState: this.userState, todoState: this.todoState });
      this.todoCount = new TodoCount({ userState: this.userState, filterState: this.filterState });

      return this;
    })();
  }

  async _render() {
    const filter = this.filterState.get();
    const userId = this.userState.get().userId;

    let todoList = await getTodoList(userId);
    todoList = this._getFilteredTodoList(todoList, filter);

    await this.userList.render();
    this.todoList.render(todoList);
    this.todoCount.renderCount(todoList ? todoList.length : 0);
  }

  _getFilteredTodoList(todoList, filter) {
    return {
      [FILTER.ALL]: todoList,
      [FILTER.ACTIVE]: todoList.filter((todoItem) => !todoItem.isCompleted),
      [FILTER.COMPLETED]: todoList.filter((todoItem) => todoItem.isCompleted),
    }[filter];
  }
}
