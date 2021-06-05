import UserList from "./UserList.js";
import { $ } from "../lib/util.js";
import { fetchRequest } from "../lib/fetchRequest.js";
import UserModel from "../model/UserModel.js";
import { API_URL } from "../constants/config.js";

class TodoApp {
  constructor() {
    this.users = [];
    this.userList = new UserList({ onAddUser: this.onAddUser.bind(this) });
    this.init();
  }

  async init() {
    const { result } = await fetchRequest(API_URL.USER, "get");

    const userListData = result.map((user) => {
      return new UserModel({ id: user._id, name: user.name, todoList: user.todoList });
    });

    this.users = userListData;
    this.userList.setState(this.users);
  }

  onAddUser() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    const newUser = new UserModel({ name: userName });
    this.users.push(newUser);
    this.userList.setState(this.users);
  }
}

export default TodoApp;
