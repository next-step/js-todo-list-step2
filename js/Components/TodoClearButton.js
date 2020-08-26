import { NODE, MESSAGE, SELECTOR } from '../utils/constant.js';
import { checkTarget } from '../utils/validator.js';

function TodoClearButton({ $target, userName, onDeleteAllTodo }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;
    this.name = userName;

    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    if (
      e.target.nodeName !== NODE.BUTTON &&
      e.target.classList.contains(SELECTOR.TODO_CLEAR_BUTTON)
    )
      return;
    if (!this.name) {
      alert(MESSAGE.NO_SELECTED_USER);
      return;
    }

    onDeleteAllTodo(this.name);
  };

  this.setState = (nextState) => {
    this.name = nextState;
  };

  this.init();
}

export default TodoClearButton;
