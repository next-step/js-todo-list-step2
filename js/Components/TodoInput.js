import { KEY, MESSAGE } from '../utils/constant.js';
import { checkTarget } from '../utils/validator.js';

function TodoInput({ $target, userName, onAddTodo }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;
    this.name = userName;

    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('keydown', this.onKeyDown);
  };

  this.onKeyDown = (e) => {
    if (e.key !== KEY.ENTER) return;

    if (!this.name) {
      alert(MESSAGE.NO_SELECTED_USER);
      e.target.value = '';
      return;
    }

    const keyword = e.target.value.trim();

    if (!keyword.length) {
      alert(MESSAGE.NO_INPUT_KEYWORD);
      e.target.value = '';
      return;
    }

    onAddTodo(this.name, keyword);
    e.target.value = '';
  };

  this.setState = (nextState) => {
    this.name = nextState;
  };

  this.init();
}

export default TodoInput;
