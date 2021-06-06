import UserList from "./UserList.js";
import { $ } from "../lib/util.js";
import { fetchRequest } from "../lib/fetchRequest.js";
import UserModel from "../model/UserModel.js";
import { API_URL } from "../constants/config.js";

class TodoApp {
  constructor() {
    this.userList = new UserList({
      onAddUser: this.onAddUser.bind(this),
      onDeleteUser: this.onDeleteUser.bind(this),
    });
    this.users = [];
    this.selectedUser = {};
    this.init();
  }

  init() {
    this.getUserList();
  }

  async getUserList() {
    const { result, error, errorMessage } = await fetchRequest(API_URL.USERS, "get");

    if (error) return alert(errorMessage);

    const userListData = result.map((user) => {
      return new UserModel({ id: user._id, name: user.name, todoList: user.todoList });
    });

    this.users = userListData;
    this.userList.setState(this.users);
    this.userList.render(this.users);
  }
  }

  async onAddUser() {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

    const { error, errorMessage } = await fetchRequest(API_URL.USERS, "post", { name: userName });
    if (error) return alert(errorMessage);
    this.getUserList();
  }

  async onDeleteUser() {
    const deleteId = this.selectedUser.id;
    const { error, errorMessage } = await fetchRequest(API_URL.USER(deleteId), "delete");
    if (error) return alert(errorMessage);
    this.selectedUser = {};
    this.getUserList();
  }
}

export default TodoApp;
