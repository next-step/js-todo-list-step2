import {
  ALL,
  ACTIVE,
  COMPLETED,
  API_BASE_URL,
  DELETE,
  POST,
  PUT,
} from '../constant/index.js';
import { createFetchOption } from '../util/index.js';
import Component from '../core/Component.js';
import State, { ComputedState } from '../core/State.js';
import UserList from './UserList.js';
import UserTitle from './UserTitle.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
import TodoFilter from './TodoFilter.js';
import TodoClearBtn from './TodoClearBtn.js';

export default class App extends Component {
  activeUser;
  filterType;
  todoLIst;

  constructor($target, $props, $children) {
    const {
      $userList,
      $userTitle,
      $todoList,
      $todoInput,
      $todoCount,
      $todoFilter,
      $todoClearBtn,
    } = $children;

    super($target, $props);

    this.activeUser = new State({}, this.render);
    this.filterType = new State(ALL, this.render);
    this.todoList = new ComputedState(this.filterTodoList, this.render, [
      this.activeUser,
      this.filterType,
    ]);

    new UserList($userList, { activeUser: this.activeUser });
    new UserTitle($userTitle, { activeUser: this.activeUser });
    new TodoList($todoList, {
      todoList: this.todoList,
      completeTodo: this.completeTodo,
      deleteTodo: this.deleteTodo,
    });
    new TodoInput($todoInput, {
      activeUser: this.activeUser,
      addTodo: this.addTodo,
    });
    new TodoCount($todoCount, {
      todoList: this.todoList,
    });
    new TodoFilter($todoFilter, {
      filterType: this.filterType,
    });
    new TodoClearBtn($todoClearBtn, {
      clearTodo: this.clearTodo,
    });
  }

  addTodo = async (contents) => {
    const option = createFetchOption(POST, { contents });
    const data = await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items/`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: this.activeUser.value.todoList.concat(await data.json()),
    };
  };

  completeTodo = async (targetItemId) => {
    const option = createFetchOption(PUT);
    await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items/${targetItemId}/toggle`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: this.activeUser.value.todoList.map((todoItem) => {
        if (todoItem._id === targetItemId)
          todoItem.isCompleted = !todoItem.isCompleted;
        return todoItem;
      }),
    };
  };

  deleteTodo = async (targetItemId) => {
    const option = createFetchOption(DELETE);
    await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items/${targetItemId}`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: this.activeUser.value.todoList.filter(
        (todoItem) => todoItem._id !== targetItemId
      ),
    };
  };

  clearTodo = async () => {
    const option = createFetchOption(DELETE);
    await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: [],
    };
  };

  filterTodoList = () => {
    const todoList = this.activeUser.value.todoList || [];

    return todoList.filter((todoItem) => {
      if (todoItem.isCompleted && this.filterType.value === COMPLETED)
        return true;
      else if (!todoItem.isCompleted && this.filterType.value === ACTIVE)
        return true;
      else if (this.filterType.value === ALL) return true;
    });
  };
}
