import { filterViewTypeTodos } from "../utils/validator.js";
class TodoCount {
  constructor({ $target, count }) {
    this.$target = $target;
    this.state = { count };
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    this.$target.innerHTML = `총 <strong>${this.state.count}</strong> 개`;
  }
}

export default TodoCount;
