import { $ } from "../lib/util.js";
import { ERROR_MESSAGES } from "../constants/message.js";
import { MINIMUM_LENGTH } from "../constants/constant.js";
import { KEY } from "../constants/eventKey.js";

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
    if (event.key !== KEY.ENTER) return;
    if (event.target.value.length < MINIMUM_LENGTH.ITEM_CONTENTS)
      return alert(ERROR_MESSAGES.TOO_SHORT_ITEM_CONTENTS);

    this.onAddItem(event.target.value);
    event.target.value = "";
  };
}

export default TodoInput;
