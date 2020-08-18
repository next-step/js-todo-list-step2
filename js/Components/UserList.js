import { fetchUserListFromServer } from "../api.js";
import Loader from "../Components/Loader.js";

function UserList($target, activeUser, { setActiveUser }) {
  this.$target = $target;
  this.userList = [];
  this.activeUser = activeUser;

  this.setState = (newActiveUser) => {
    this.activeUser = newActiveUser;
    this.render();
  };

  this.render = () => {
    const userListHTML = this.userList
      .map(
        ({ name }) =>
          `<button class="ripple user-button ${
            this.activeUser === name ? "active" : ""
          }"> ${name} </button>`
      )
      .join("");

    this.$target.innerHTML = `
      <div class="loader"></div>
      ${userListHTML}
    `;
  };

  this.initEventListeners = () => {
    this.$target.addEventListener("click", this.onUserClickHandler.bind(this));
  };

  this.onUserClickHandler = (e) => {
    if (!e.target.classList.contains("user-button")) {
      return;
    }
    const clickedUser = e.target.textContent.trim();
    setActiveUser(clickedUser);
  };

  this.fetchUserList = async () => {
    try {
      this.loader.setState(true);
      this.userList = await fetchUserListFromServer();
      this.render();
    } catch (e) {
      alert("유저리스트를 불러오는데 에러가 발생했습니다.");
      console.error(e);
    } finally {
      this.loader.setState(false);
    }
  };

  this.render();
  this.initEventListeners();
  this.loader = new Loader(document.querySelector(".loader"));

  this.fetchUserList();
}

export default UserList;
