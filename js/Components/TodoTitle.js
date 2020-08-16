import { todoTitleHTML } from '../utils/template.js';

function TodoTitle({ $target, name }) {
  this.init = () => {
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
