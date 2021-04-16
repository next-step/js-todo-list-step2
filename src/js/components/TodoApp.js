import { todoTemplate, userTemplate, userListActionButtonTemplate } from "@js/template";
import { getEl, pipe } from "@js/util";
import { getUsers } from "@lib/api";
import { FILTER_TYPE } from "@constants/constant";

import TodoUser from "./TodoUser";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";

class TodoApp {
  constructor(store) {
    this.store = store;
    this.todoListEl = getEl("ul.todo-list");
    this.todoCountEl = getEl("span.todo-count strong");
    this.userNameEl = getEl("#user-title strong");
    this.userListEl = getEl("#user-list");
    this.init();
  }

  async init() {
    const { data } = await getUsers();
    const [selectedUser] = data;

    this.store.on(["selectedUser", "selectedUser.todoList", "filter"], this.updateTodoListViewPipe.bind(this));
    this.store.on(["selectedUser", "users"], this.updateUserListView.bind(this));
    this.store.set({
      selectedUser: { ...selectedUser },
      users: data,
      filter: FILTER_TYPE.ALL,
    });

    new TodoUser(this.store);
    new TodoInput(this.store);
    // new TodoList(this.store);
    // new TodoFilters(this.store);
  }

  _getTodoListData() {
    const { selectedUser, filter } = this.store.get();

    let onFilteringTodoList = selectedUser.todoList;
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = selectedUser.todoList.filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = selectedUser.todoList.filter((item) => item.isCompleted);

    return { selectedUser, onFilteringTodoList };
  }

  _renderTodoList({ selectedUser, onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map(({ contents, _id, isCompleted }) => todoTemplate({ contents, _id, isCompleted })).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;

    return selectedUser;
  }

  _saveTodoListData({ _id }) {

  }

  updateTodoListViewPipe() {
    pipe(
      this._getTodoListData.bind(this),
      this._renderTodoList.bind(this),
      this._saveTodoListData.bind(this)
    )();
  }

  updateUserListView() {
    const { selectedUser, users } = this.store.get();
    const userListTemplate = users.map((user) => userTemplate({ _id: user._id, name: user.name, isSelected: selectedUser._id === user._id })).join("");

    this.userNameEl.innerText = selectedUser.name;
    this.userListEl.innerHTML = userListTemplate + userListActionButtonTemplate();
  }
}

export default TodoApp;
