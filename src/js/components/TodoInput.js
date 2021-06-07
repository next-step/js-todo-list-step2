import { $ } from "../lib/util.js";

class TodoInput {
  constructor({ onAddItem }) {
    this.onAddItem = onAddItem;
    this.init();
  }

  init() {
    this.registerEventListener();
  }

  registerEventListener() {
    $(".new-todo").addEventListener("keydown", (event) => this.addTodoItem(event));
  }

  addTodoItem = (event) => {
    if (event.key !== "Enter") return;

    this.onAddItem(event.target.value);
    event.target.value = "";
  };
}

export default TodoInput;
