import { TARGETS } from "../../shared/utils/constants.js";

class TodoUserList {
  constructor({ $target, userList, activeUser, onChangeActiveUser }) {
    this.$target = $target;
    this.state = { userList, activeUser };
    this.onChangeActiveUser = onChangeActiveUser;

    document
      .querySelector(TARGETS.TODO_USER_LIST)
      .addEventListener("click", this.onClick);
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  onClick = e => {
    if (e.target.nodeName !== "BUTTON" || e.target.classList.contains("active"))
      return;
    this.onChangeActiveUser({ activeUser: e.target.dataset.id });
  };

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
