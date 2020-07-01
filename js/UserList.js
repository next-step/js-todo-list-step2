import { userListTemplate } from "../utils/templates.js";

export default function UserList(params) {
  const { $target, changeUser } = params;
  this.users = params.users;
  this.userName = params.userName;

  $target.addEventListener("click", (e) => {
    changeUser(e.target.innerHTML);
  });

  this.setState = (nextUsers, nextUserName) => {
    this.users = nextUsers;
    this.nextUserName = nextUserName;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = userListTemplate(this.users, this.userName);
  };

  this.render();
}
