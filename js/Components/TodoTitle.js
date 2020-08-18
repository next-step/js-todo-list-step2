import { todoTitleHTML } from '../utils/template.js';
import { checkTarget } from '../utils/validator.js';

function TodoTitle({ $target, name }) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;
    this.name = name;

    this.render();
  };

  this.setState = (nextState) => {
    this.name = nextState;

    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = todoTitleHTML(this.name);
  };

  this.init();
}

export default TodoTitle;
