import { getEl } from "@js/util";
import { KEY } from "@js/constants/constant";

class TodoInput {
  constructor(store) {
    this.store = store;
    this.inputEl = getEl("input.new-todo");
    this.init();
  }

  init() {
    this.inputEl.addEventListener("keyup", this.addTodoHandler.bind(this));
  }

  addTodoHandler({ keyCode, target }) {
    if (keyCode !== KEY.ENTER || !target.value) return;
    const todoList = this.store.get().todoList;
    const id = new Date().getTime();
    const newTodo = {
      title: target.value,
      id: id,
      isCompleted: false,
      isEditing: false,
    };
    todoList[id] = newTodo;
    target.value = "";

    this.store.set({
      todoList: { ...todoList },
    });
  }
}

export default TodoInput;
