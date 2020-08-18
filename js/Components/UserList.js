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
        `<button class="ripple user-button ${
          this.activeUser === name ? "active" : ""
        }"> ${name} </button>`
    ).join('');
  };

  this.initEventListeners = () => {
    this.$target.addEventListener('click', this.onUserClickHandler.bind(this))
  }

  this.onUserClickHandler = (e) => {
    if (!e.target.classList.contains('user-button')) {
      return
    }
  }

  this.init = async () => {
    try {
      this.userList = await fetchUserListFromServer();
      this.render();
      this.initEventListeners()
    } catch (e) {
      alert('유저리스트를 불러오는데 에러가 발생했습니다.')
      console.error(e)
    }
  };

  this.init();
}

export default UserList;
