import { getUserList } from "../apis/todo.js";
import { SELECTOR, INITIAL_VALUE } from "../utils/constants.js";
import { userListTemplate } from "../utils/templates.js";

export default function UserList($userList, { setUsername }) {
  this.users = [];
  this.activeUser = INITIAL_VALUE.USERNAME;

  const onClickUsername = ({ target: $target }) => {
    if ($target.classList.contains(SELECTOR.USER_NAME)) {
      this.activeUser = $target.textContent;
      setUsername(this.activeUser);
    }
  };

  this.render = () => {
    const template = this.users.map((user) =>
      userListTemplate(user, this.activeUser)
    );
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
