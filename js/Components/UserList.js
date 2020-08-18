import { fetchUserListFromServer } from "../api.js";

function UserList($target, activeUser) {
  this.$target = $target;
  this.userList = [];
  this.activeUser = activeUser;

  this.setState = (newActiveUser) => {
    this.activeUser = newActiveUser;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.userList.map(
      ({ name }) =>
        `<button class="ripple ${
          this.activeUser === name ? "active" : ""
        }"> ${name} </button>`
    );
  };

  this.init = async () => {
    this.userList = await fetchUserListFromServer();
    this.render();
  };

  this.init();
}

export default UserList;
