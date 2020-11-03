class TodoUserList {
  constructor({ $target, userList, activeUser }) {
    this.$target = $target;
    this.state = { userList, activeUser };
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    const users = this.state.userList.map(user => {
      return `<button class="ripple ${
        this.state.activeUser === user._id ? "active" : ""
      }" data-id="${user._id}">${user.name}</button>`;
    });

    this.$target.innerHTML = users.join("");
  }
}

export default TodoUserList;
