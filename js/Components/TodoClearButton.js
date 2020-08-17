import { NODE } from '../utils/constant.js';

function TodoClearButton({ $target, userName, onDeleteAllTodo }) {
  this.init = () => {
    this.$target = $target;
    this.name = userName;

    this.bindEvents();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    if (e.target.nodeName !== NODE.BUTTON) return;

    onDeleteAllTodo(this.name);
  };

  this.setState = (nextState) => {
    this.name = nextState;
  };

  this.init();
}

export default TodoClearButton;
