import Event from "../utils/event.js";
import { TodoStore } from "../stores/index.js";
import { MESSAGES } from "../../shared/utils/constants.js";

class TodoDeleteUserButton {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.deleteUser = Event.deleteUser;
    this.setGlobalState = setGlobalState;

    this.$target.addEventListener("click", this.onClick);
  }

  onClick = async () => {
    const { activeUser } = TodoStore.getStore;
    if (confirm(MESSAGES.DELETE_USER_CONFIRM)) {
      await this.deleteUser(activeUser);
      this.setGlobalState();
    }
  };
}

export default TodoDeleteUserButton;
