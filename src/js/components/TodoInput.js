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
    if (event.target.value < 2) return alert("최소 2글자 이상이어야 합니다.");

    this.onAddItem(event.target.value);
    event.target.value = "";
  };
}

export default TodoInput;
