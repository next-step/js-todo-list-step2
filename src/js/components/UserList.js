import { $ } from "../lib/util.js";
import template from "../constants/template.js";

class UserList {
  constructor({ onAddUser, onDeleteUser, onSelectUser }) {
    this.onAddUser = onAddUser;

  setState(updatedUsers) {
    this.users = updatedUsers;
    this.render(this.users);
  }

  render(users) {
    let userTemplate = "";
    if (users) {
      userTemplate = users
        .map((user) => {
          return `
          <button class="ripple">${user.name}</button>`;
        })
        .join("");
    }

    this.target.innerHTML = userTemplate + template.userButton;
    this.registerEventListener();
  }

  registerEventListener() {
    $(".user-create-button").addEventListener("click", this.onAddUser);
  }
}

export default UserList;
