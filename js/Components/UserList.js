import api from "../api.js";
import {
  validateUserName,
  isFunction,
  validateInstance,
  isBoolean,
} from "../utils.js";
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
    if (state?.activeUser) {
      validateUserName(activeUser);
      this.state.activeUser = state.activeUser;
    }
    if (isBoolean(state?.isLoading)) {
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

  this.initEventListeners = () => {
    const onClickHandler = (event) => {
      if (event.target.classList.contains("ripple")) {
        onClickUser(event.target.textContent);
      }
    };

    $target.addEventListener("click", onClickHandler);
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

  this.initEventListeners();
  this.render();
  this.fetchUserListWithLoader();
}

export default UserList;
