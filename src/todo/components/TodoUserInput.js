import { TodoStore } from "../stores/index.js";
import Event from "../utils/event.js";

class TodoUserInput {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
    this.setGlobalState = setGlobalState;
    this.changeActiveUser = Event.changeActiveUser;

    this.render();

    this.$target.addEventListener("change", this.onChange);
  }

  onChange = e => {
    if (e.target.value === "") return;

    const activeUser = document.querySelector(`[data-id="${e.target.value}"]`)
      ?.dataset.id;

    if (!activeUser) return;

    this.changeActiveUser({ activeUser });

    this.setGlobalState();
  };

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    if (this.state.activeUser) {
      this.$target.value = document.querySelector(
        `[data-id="${this.state.activeUser}"]`
      ).value;
    }
  }
}

export default TodoUserInput;
