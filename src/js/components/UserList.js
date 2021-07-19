import { $ } from "../lib/util.js";
import template from "../constants/template.js";

class UserList {
  constructor({ onAddUser, onDeleteUser, onSelectUser }) {
    this.onAddUser = onAddUser;
    this.onDeleteUser = onDeleteUser;
    this.onSelectUser = onSelectUser;
  }

  render(users) {
    let userTemplate = "";
    if (users) {
      userTemplate = users
        .map((user, index) => {
          return `<button class="ripple ${index === 0 ? "active" : ""}"data-id=${user.id}>
          ${user.name}</button>`;
        })
        .join("");
    }

    $("#user-list").innerHTML = userTemplate + template.userButton;
    $("#user-title").querySelector("strong").innerHTML = users[0].name;

    this.registerEventListener();
  }

  onClickUser(target) {
    const id = target.dataset.id;
    if (!id) return;

    $("#user-list")
      .querySelectorAll("button")
      .forEach((element) => element.classList.remove("active"));

    target.classList.add("active");
    $("#user-title").querySelector("strong").innerHTML = target.innerHTML;

    this.onSelectUser(id);
  }

  registerEventListener() {
    $(".user-create-button").addEventListener("click", this.onAddUser);
    $(".user-delete-button").addEventListener("click", this.onDeleteUser);

    $("#user-list")
      .querySelectorAll("button")
      .forEach((element) => element.addEventListener("click", (e) => this.onClickUser(e.target)));
  }
}

export default UserList;
