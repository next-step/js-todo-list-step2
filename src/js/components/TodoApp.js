import { todoTemplate, userTemplate, userListActionButtonTemplate } from "@js/template";
import { getEl, pipe } from "@js/util";
import { getUsers } from "@lib/api";
import { FILTER_TYPE } from "@constants/constant";

import TodoUserList from "./TodoUserList";
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
    const { data: _users } = await getUsers();
    const [selectedUser] = _users;

    this.store.on(["selectedUser", "selectedUser.todoList", "filter"], this.updateTodoListViewPipe.bind(this));
    this.store.on(["selectedUser", "users"], this.updateUserListViewPipe.bind(this));
    this.store.set({
      selectedUser: { ...selectedUser },
      users: [..._users],
      filter: FILTER_TYPE.ALL,
    });

    new TodoUserList(this.store);
    new TodoInput(this.store);
    new TodoList(this.store);
    new TodoFilters(this.store);
  }

  updateTodoListViewPipe() {
    pipe(
      this._getTodoListData.bind(this),
      this._renderTodoList.bind(this)
    )();
  }

  updateUserListViewPipe() {
    pipe(
      this._getUserListData.bind(this),
      this._renderUserList.bind(this)
    )();
  }

  _getTodoListData() {
    const { selectedUser, filter } = this.store.get();

    let onFilteringTodoList = selectedUser.todoList;
    if (filter === FILTER_TYPE.ACTIVE) onFilteringTodoList = selectedUser.todoList.filter((item) => !item.isCompleted);
    if (filter === FILTER_TYPE.COMPLETED) onFilteringTodoList = selectedUser.todoList.filter((item) => item.isCompleted);

    return { onFilteringTodoList };
  }

  _getUserListData() {
    const { selectedUser, users } = this.store.get();
    return { selectedUser, users }
  }

  _renderTodoList({ onFilteringTodoList }) {
    const todoListTemplate = onFilteringTodoList.map(({ contents, _id, isCompleted, priority }) => todoTemplate({ contents, _id, isCompleted, priority })).join("");

    this.todoListEl.innerHTML = todoListTemplate;
    this.todoCountEl.innerText = onFilteringTodoList.length;
  }

  _renderUserList({ selectedUser, users }) {
    const userListTemplate = users.map((user) => userTemplate({ _id: user._id, name: user.name, isSelected: selectedUser._id === user._id })).join("");

    this.userNameEl.innerText = selectedUser.name;
    this.userListEl.innerHTML = userListTemplate + userListActionButtonTemplate();
  }
}

export default TodoApp;
