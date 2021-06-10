import { FILTER } from '@constants/constants.js';

// state
import UserState from '@store/userState.js';
import TodoState from '@store/todoState.js';
import FilterState from '@store/filterState.js';

// components
import UserList from '@userList/UserList.js';
import TodoInput from '@todoList/TodoInput.js';
import TodoCount from '@todoList/TodoCount.js';
import TodoList from '@todoList/TodoList.js';

export default class TodoApp {
  constructor() {
    // state
    this.todoState = TodoState;
    this.filterState = FilterState;
    this.userState = UserState;

    this.todoState.subscribe(this.render.bind(this));
    this.filterState.subscribe(this.render.bind(this));
    this.userState.subscribe(this.render.bind(this));

    return (async () => {
      // components
      this.userList = await new UserList();
      new TodoInput();
      this.todoList = new TodoList();
      this.todoCount = new TodoCount();

      return this;
    })();
  }

  render() {
    const filter = this.filterState.get();
    let todoList = this.todoState.get();
    todoList = this.getFilteredTodoList(todoList, filter);

    this.userList && this.userList.render();
    this.todoList && this.todoList.render(todoList);
    this.todoCount && this.todoCount.renderCount(todoList ? todoList.length : 0);
  }

  getFilteredTodoList(todoList, filter) {
    return {
      [FILTER.ALL]: todoList,
      [FILTER.ACTIVE]: todoList.filter((todoItem) => !todoItem.isCompleted),
      [FILTER.COMPLETED]: todoList.filter((todoItem) => todoItem.isCompleted),
    }[filter];
  }
}
