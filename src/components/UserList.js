import { getUserList } from "../apis/todo.js";
import { SELECTOR, INITIAL_VALUE } from "../utils/constants.js";

export default function UserList($userList, { setUsername }) {
  this.users = [];
  this.activeUser = INITIAL_VALUE.USERNAME;

  const onClickUsername = (event) => {
    const $target = event.target;

    if ($target.classList.contains(SELECTOR.USER_NAME)) {
      this.activeUser = $target.textContent;
      setUsername(this.activeUser);
    }
  };

  this.userListTemplate = (user) => `
    <button class="user-name ripple ${
      this.activeUser === user.name ? "active" : ""
    }">${user.name}</button>
  `;

  this.render = () => {
    const template = this.users.map(this.userListTemplate);
    $userList.innerHTML = template.join("");
  };

  this.init = async () => {
    try {
      this.users = await getUserList();
      setUsername(this.activeUser);
      $userList.addEventListener("click", onClickUsername);
    } catch (error) {
      console.log(error);
    }
  };

  this.init();
}
