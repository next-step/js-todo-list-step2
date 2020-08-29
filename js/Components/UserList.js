import api from "../api.js";
import { validateUserName, isFunction, validateInstance } from "../utils.js";
import Loader from "../Components/Loader.js";

function UserList($target, activeUser, { onClickUser }) {
  validateInstance(UserList, this);
  if (!isFunction(onClickUser)) {
    throw new Error("Wrong onClickUser");
  }
  validateUserName(activeUser);

  this.state = {
    activeUser,
    users: [],
    isLoading: false,
  };

  this.setState = (state) => {
    if (state && state.activeUser) {
      validateUserName(activeUser);
      this.state.activeUser = state.activeUser;
    }
    if (state && typeof state.isLoading === "boolean") {
      this.state.isLoading = state.isLoading;
    }
    this.render();
  };

  this.render = () => {
    $target.innerHTML = this.state.isLoading
      ? Loader
      : this.state.users
          .map(
            ({ name }) =>
              `<button class="ripple ${
                this.state.activeUser === name ? "active" : ""
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
      this.state.users = await api.fetchTodoUsers();
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
