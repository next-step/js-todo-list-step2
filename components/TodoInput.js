import { ENTER, KEYDOWN } from "../utils/data.js";

export default function TodoInput({ elementId, addTodos }) {
  this.init = () => {
    if (!(this instanceof TodoInput)) {
      throw new Error(`Invalid function call ${this}`);
    }
    this.$todoInput = document.querySelector(`.${elementId}`);
    this.addTodos = addTodos;
  };
  this.enterHandler = (evt) => {
    if (evt.key === ENTER) {
      this.addTodos({
        content: evt.target.value,
      });
      evt.target.value = "";
      evt.target.focus();
    }
  };
  this.bindEventListener = () => {
    this.$todoInput.addEventListener(KEYDOWN, this.enterHandler);
  };
  this.init();
  this.bindEventListener();
}
