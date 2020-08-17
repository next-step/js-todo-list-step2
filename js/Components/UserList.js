import { fetchTodoUsersFromServer } from "../api.js";
import { validateUserName, isFunction } from "../utils.js";
import Loader from "../Components/Loader.js";

function UserList($target, activeUser, eventHandler) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  if (!eventHandler || !isFunction(eventHandler.onClickUser)) {
    throw new Error("Wrong EventHandler");
  }

  validateUserName(activeUser);
  this.activeUser = activeUser;
  this.users = [];

  this.setState = (newActiveUser) => {
    validateUserName(newActiveUser);
    this.activeUser = newActiveUser;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
        <div class="loader"></div>
        ${this.users
          .map(
            ({ name }) =>
              `<button class="ripple ${
                this.activeUser === name ? "active" : ""
              }">${name}</button>`
          )
          .join(" ")}
        `;
  };

  this.bindEvent = () => {
    $target.addEventListener("click", (event) => {
      if (event.target.classList.contains("ripple")) {
        eventHandler.onClickUser(event.target.textContent);
      }
    });
  };

  this.fetchUserListWithLoader = async () => {
    this.loader = new Loader($target.querySelector(".loader"));
    this.loader.setState(true);
    this.users = await fetchTodoUsersFromServer();
    this.loader.setState(false);
    this.render();
  };

  this.bindEvent();
  this.render();
  this.fetchUserListWithLoader();
}

export default UserList;
