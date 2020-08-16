import { fetchTodoUsersFromServer } from "../api.js";
import { validateUserName, isFunction } from "../utils.js";

function UserList($target, activeUser, eventHandler) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  if (!eventHandler || !isFunction(eventHandler.onClickUser)) {
    throw new Error("Wrong EventHandler");
  }

  validateUserName(activeUser);
  this.activeUser = activeUser;

  this.setState = (newActiveUser) => {
    validateUserName(newActiveUser);
    this.activeUser = newActiveUser;
    this.render();
  };

  this.render = async () => {
    const users = await fetchTodoUsersFromServer();
    $target.innerHTML = users
      .map(
        ({ name }) =>
          `<button class="ripple ${
            this.activeUser === name ? "active" : ""
          }">${name}</button>`
      )
      .join(" ");
  };

  this.bindEvent = () => {
    $target.addEventListener("click", (event) => {
      if (event.target.classList.contains("ripple")) {
        eventHandler.onClickUser(event.target.textContent);
      }
    });
  };

  this.render();
  this.bindEvent();
}

export default UserList;
