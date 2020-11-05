import { TodoStore } from "../stores/index.js";

class TodoUserList {
  constructor({ $target }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    const users = this.state.userList.map(user => {
      return `<option class="ripple" data-id="${user._id}" value="${
        user._id
      }" ${this.state.activeUser === user._id ? "selected" : ""}>${
        user.name
      }</option>`;
    });

    this.$target.innerHTML = users.join("");
  }
}

export default TodoUserList;
