import { isFunction, validateInstance, isEmptyString } from "../utils.js";

function TodoInput($target, eventHandler) {
  validateInstance(TodoInput, this);

  if (!isFunction(eventHandler?.onSubmit)) {
    throw new Error("Wrong eventHandler");
  }

  this.focusInputElem = () => {
    this.$inputElem.focus();
  };

  this.initEventListeners = () => {
    const onSubmitHandler = (event) => {
      event.preventDefault();

      const contentText = this.$inputElem.value.trim();

      if (isEmptyString(contentText)) {
        console.log("Empty input");
        return;
      }
      eventHandler.onSubmit(contentText);
      this.$inputElem.value = "";
    };

    $target.addEventListener("submit", onSubmitHandler);
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
  this.initEventListeners();
}

export default TodoInput;
