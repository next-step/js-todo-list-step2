import UserTitle from "./UserTitle.js";
import { DEFAULT_USER } from "../constants.js";
import { getUserList } from "../api/users.js";

class App {
  #state;

  constructor($target) {
    this.$target = $target;
    this.#state = {
      user: null,
      userList: [],
    };
    this.initComponents();
  }

  initComponents() {
    this.userTitle = new UserTitle(
      this.$target.querySelector("#user-title"),
      this.#state.user
    );
  }

  fetchUserList() {
    getUserList();
  }
}

export default App;
