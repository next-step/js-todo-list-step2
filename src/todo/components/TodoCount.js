import { TodoStore } from "../stores/index.js";
class TodoCount {
  constructor({ $target }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
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
