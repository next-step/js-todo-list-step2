import { fetchTodoUsersFromServer } from "../api.js";
import { validateUserName, isFunction, validateInstance } from "../utils.js";
import Loader from "../Components/Loader.js";

function UserList($target, activeUser, { onClickUser }) {
  validateInstance(UserList, this);
  if (!isFunction(onClickUser)) {
    throw new Error("Wrong onClickUser");
  }
  validateUserName(activeUser);
  this.activeUser = activeUser;
  this.users = [];
  this.isLoading = false;

  this.setState = ({ activeUser, isLoading }) => {
    if (activeUser) {
      validateUserName(activeUser);
      this.activeUser = activeUser;
    }
    if (typeof isLoading === "boolean") {
      this.isLoading = isLoading;
    }
    this.render();
  };

  this.render = () => {
    $target.innerHTML = this.isLoading
      ? Loader
      : this.users
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
        onClickUser(event.target.textContent);
      }
    });
  };

  this.fetchUserListWithLoader = async () => {
    try {
      this.setState({ isLoading: true });
      this.users = await fetchTodoUsersFromServer();
    } catch (error) {
      throw new Error(`${error.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  this.bindEvent();
  this.render();
  this.fetchUserListWithLoader();
}

export default UserList;
