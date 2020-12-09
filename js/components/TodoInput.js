import { checkTarget, checkFunction } from "../utils/validator.js";
import { EVENT, KEY } from "../utils/constant.js";

function TodoInput({ $target, onAddTodo, store }) {
  this.init = () => {
    checkTarget($target);
    checkFunction(onAddTodo);

    this.bindEvents();
  };

  this.bindEvents = () => {
    $target.addEventListener(EVENT.KEY_DOWN, this.onKeyDown);
  };

  this.onKeyDown = (e) => {
    if (e.key != KEY.ENTER) return;
    const userId = store.getState().user._id;
    if (!userId) {
      e.target.value = "";
      return;
    }

    const title = e.target.value.trim();

    if (!title) {
      e.target.value = "";
      return;
    }
    onAddTodo(title, userId);
    e.target.value = "";
  };

  this.init();
}

export default TodoInput;
