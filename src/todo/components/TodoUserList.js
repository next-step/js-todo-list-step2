import { TodoStore } from "../stores/index.js";
import Event from "../utils/event.js";
import { TARGETS } from "../../shared/utils/constants.js";

class TodoUserList {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
    this.changeActiveUser = Event.changeActiveUser;
    this.setGlobalState = setGlobalState;

    document
      .querySelector(TARGETS.TODO_USER_LIST)
      .addEventListener("click", this.onChangeActiveUser);
  }

  onChangeActiveUser = e => {
    if (e.target.nodeName !== "BUTTON" || e.target.classList.contains("active"))
      return;

    this.changeActiveUser({ activeUser: e.target.dataset.id });

    this.setGlobalState();
  };

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
