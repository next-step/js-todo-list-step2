import { getEl } from "@js/util";
import { UI_CLASS, KEY, MESSAGES } from "@constants/constant";

class TodoList {
  constructor(store) {
    this.store = store;
    this.todoListEl = getEl("ul.todo-list");
    this.init();
  }

  init() {
    this.todoListEl.addEventListener("click", this.todoClickDelegationHandler.bind(this));
    this.todoListEl.addEventListener("dblclick", this.modifyHandler.bind(this));
    this.todoListEl.addEventListener("keyup", this.confirmHandler.bind(this));
  }

  _toggleTodoItem({ id }) {
    const todoList = this.store.get().todoList;
    todoList[id].isCompleted = !todoList[id].isCompleted;

    this.store.set({
      todoList: { ...todoList },
    });
  }

  _destroyTodoItem({ id }) {
    if (!confirm(MESSAGES.DELETE)) return;
    const todoList = this.store.get().todoList;
    delete todoList[id];

    this.store.set({
      todoList: { ...todoList },
    });
  }

  todoClickDelegationHandler({ target }) {
    if (target.classList.contains(UI_CLASS.TOGGLE)) return this._toggleTodoItem(target);
    if (target.classList.contains(UI_CLASS.DESTROY)) return this._destroyTodoItem(target);
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
