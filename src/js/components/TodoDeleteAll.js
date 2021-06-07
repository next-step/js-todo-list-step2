import { $ } from "../lib/util.js";

class TodoDeleteAll {
  constructor({ onDeleteAll }) {
    this.onDeleteAll = onDeleteAll;
    this.init();
  }

  init() {
    this.registerEventListener();
  }

  registerEventListener() {
    $(".clear-completed").addEventListener("click", this.onDeleteAll);
  }
}

export default TodoDeleteAll;
