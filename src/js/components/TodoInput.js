import { getEl } from "@js/util";
import { KEY } from "@constants/constant";

class TodoInput {
  constructor(store) {
    this.store = store;
    this.inputEl = getEl("input.new-todo");
    this.init();
  }

  init() {
    this.inputEl.addEventListener("keyup", this.addTodoHandler.bind(this));
  }

  addTodoHandler({ key, target }) {
    if (key !== KEY.ENTER || !target.value) return;
    const todoList = this.store.get().todoList;
    const id = new Date().getTime();
    const newTodo = {
      title: target.value,
      _id: id,
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
