import { isFunction, validateInstance, isEmptyString } from "../utils.js";

function TodoInput($target, eventHandler) {
  validateInstance(TodoInput, this);

  if (!eventHandler || !isFunction(eventHandler.onSubmit)) {
    throw new Error("Wrong eventHandler");
  }

  this.focusInputElem = () => {
    this.$inputElem.focus();
  };

  this.bindEvent = () => {
    $target.addEventListener("submit", (event) => {
      event.preventDefault();

      const contentText = this.$inputElem.value.trim();

      if (isEmptyString(contentText)) {
        console.log("Empty input");
        return;
      }
      eventHandler.onSubmit(contentText);
      this.$inputElem.value = "";
    });
  };

  this.render = () => {
    $target.innerHTML = `
      <label for="todo-input-from">
          <form id="todo-input-form">
            <input
                class="new-todo"
                placeholder="할일을 추가해주세요"
                autofocus
            />
          </form>
      </label>
    `;
    this.$inputElem = document.querySelector(".new-todo");
  };

  this.render();
  this.bindEvent();
}

export default TodoInput;
