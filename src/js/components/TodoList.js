import { getEl } from "@js/util";
import * as api from "@lib/api";
import { UI_CLASS, KEY, MESSAGES } from "@constants/constant";

class TodoList {
  constructor(store) {
    this.store = store;
    this.todoListEl = getEl("ul.todo-list");
    this.todoItemAllDeleteButton = getEl("button.clear-completed");
    this.init();
  }

  init() {
    this.todoListEl.addEventListener("click", this.todoClickDelegationHandler.bind(this));
    this.todoListEl.addEventListener("dblclick", this.modifyHandler.bind(this));
    this.todoListEl.addEventListener("keyup", this.confirmHandler.bind(this));
    this.todoItemAllDeleteButton.addEventListener('click', this._allDestroyTodoItem.bind(this));
  }

  todoClickDelegationHandler({ target }) {
    if (target.classList.contains(UI_CLASS.TOGGLE)) return this._toggleTodoItem(target);
    if (target.classList.contains(UI_CLASS.DESTROY)) return this._destroyTodoItem(target);
  }

  async _setSelectedUser(userId) {
    const { data } = await api.getUser(userId);

    this.store.set({
      selectedUser: { ...data },
    });
  }

  async _toggleTodoItem({ dataset: { _id: todoId } }) {
    const { selectedUser: { _id: userId } } = this.store.get();
    await api.toggleTodoItem({ userId, todoId });
    this._setSelectedUser(userId);
  }

  async _destroyTodoItem({ dataset: { _id: todoId } }) {
    if (!confirm(MESSAGES.DELETE_TODO)) return;

    const { selectedUser: { _id: userId } } = this.store.get();
    await api.deleteTodoItem({ userId, todoId });
    this._setSelectedUser(userId);
  }

  async _allDestroyTodoItem() {
    if (!confirm(MESSAGES.DELETE_TODO)) return;

    const { selectedUser: { _id: userId } } = this.store.get();
    await api.allDeleteTodoItem({ userId });
    this._setSelectedUser(userId);
  }

  modifyHandler({ target }) {
    if (!target.classList.contains(UI_CLASS.LABEL)) return;

    const { _id: todoId } = target.closest(`.${UI_CLASS.TODO_ITEM}`).dataset;
    getEl(`li[data-_id="${todoId}"]`).classList.add(UI_CLASS.EDITING);
  }

  async confirmHandler({ key, target }) {
    if (key === KEY.ENTER || key === KEY.ESCAPE) {
      const { _id: todoId } = target.closest(`.${UI_CLASS.TODO_ITEM}`).dataset;
      if (key === KEY.ESCAPE) return getEl(`li[data-_id="${todoId}"]`).classList.remove(UI_CLASS.EDITING);

      const { selectedUser: { _id: userId } } = this.store.get();
      await api.modifyTodoItem({ userId, todoId, contents: target.value });
      this._setSelectedUser(userId);
    }
  }
}

export default TodoList;
