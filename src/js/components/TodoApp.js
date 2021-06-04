import UserList from "./UserList.js";
import { $ } from "../lib/util.js";
import UserModel from "../model/UserModel.js";

class TodoApp {
  constructor() {
    this.users = [];
    this.userList = new UserList({ onAddUser: this.onAddUser.bind(this) });
    this.init();
  }

  init() {}

  onAddUser() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    const newUser = new UserModel({ name: userName });
    this.users.push(newUser);
    this.userList.setState(this.users);
  }
}

export default TodoApp;
