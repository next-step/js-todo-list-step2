import { getEl } from "@js/util";
import { userTemplate } from "@js/template";
import { addUser } from "@lib/api";

class TodoUser {
  constructor(store) {
    this.store = store;
    this.currSeletedUser = "";
    this.userNameEl = getEl("#user-title strong");
    this.userListEl = getEl("#user-list");
    this.dom = null;
    this.id = 1;
    this.init();
  }

  init() {
    this.userNameEl.innerText = this.store.get().user.name;
    this.userListEl.innerHTML = this.store
      .get()
      .todoData.map((todoItem) => userTemplate({ _id: todoItem._id, name: todoItem.name }))
      .join("");
  }
}

export default TodoUser;
