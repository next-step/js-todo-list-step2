import Event from "../utils/event.js";
import { TodoStore } from "../stores/index.js";

class TodoDeleteUserButton {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.deleteUser = Event.deleteUser;
    this.setGlobalState = setGlobalState;

    this.$target.addEventListener("click", this.onClick);
  }

  onClick = async () => {
    const { activeUser } = TodoStore.getStore;
    if (confirm("정말 삭제하시겠습니까?")) {
      await this.deleteUser(activeUser);
      this.setGlobalState();
    }
  };
}

export default TodoDeleteUserButton;
