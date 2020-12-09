import Event from "../utils/event.js";

class TodoCreateUserButton {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.addUser = Event.addUser;
    this.setGlobalState = setGlobalState;

    this.$target.addEventListener("click", this.onClick);
  }
  onClick = async e => {
    if (e.target.nodeName !== "BUTTON") return;

    if (e.target.classList.contains("user-create-button")) {
      await this.addUser();
    }

    this.setGlobalState();
  };
}

export default TodoCreateUserButton;
