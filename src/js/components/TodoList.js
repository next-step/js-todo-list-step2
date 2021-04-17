import { getEl } from "@js/util";
import { getUser, toggleTodoItem, deleteTodoItem, allDeleteTodoItem } from "@lib/api";
import { UI_CLASS, KEY, MESSAGES } from "@constants/constant";

class TodoList {
  constructor(store) {
    this.store = store;
    this.todoListEl = getEl("ul.todo-list");
    this.todoItemAllDeleteButton = getEl(".clear-completed");
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

  async _toggleTodoItem({ dataset: { _id: todoId } }) {
    const { selectedUser } = this.store.get();
    await toggleTodoItem({ userId: selectedUser._id, todoId });
    const { data } = await getUser(selectedUser._id);

    this.store.set({
      selectedUser: { ...data },
    });
  }

  async _destroyTodoItem({ dataset: { _id: todoId } }) {
    if (!confirm(MESSAGES.DELETE_TODO)) return;

    const { selectedUser } = this.store.get();
    await deleteTodoItem({ userId: selectedUser._id, todoId });
    const { data } = await getUser(selectedUser._id);

    this.store.set({
      selectedUser: { ...data },
    });
  }

  async _allDestroyTodoItem() {
    if (!confirm(MESSAGES.DELETE_TODO)) return;

    const { selectedUser } = this.store.get();
    await allDeleteTodoItem({ userId: selectedUser._id });
    const { data } = await getUser(selectedUser._id);

    this.store.set({
      selectedUser: { ...data },
    });
  }

  modifyHandler({ target }) {
    if (!target.classList.contains(UI_CLASS.LABEL)) return;
    const { id } = target.closest("li");
    const todoList = this.store.get().todoList;
    todoList[id].isEditing = true;

    this.store.set({
      todoList: { ...todoList },
    });
  }

  confirmHandler({ keyCode, target }) {
    if (keyCode === KEY.ENTER || keyCode === KEY.ESCAPE) {
      const { id } = target.closest("li");
      const todoList = this.store.get().todoList;
      if (keyCode === KEY.ENTER) todoList[id].title = target.value;
      todoList[id].isEditing = false;

      this.store.set({
        todoList: { ...todoList },
      });
    }
  }
}

export default TodoList;
