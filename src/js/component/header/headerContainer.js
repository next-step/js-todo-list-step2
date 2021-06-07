import { $ } from "../../util/querySelector.js";
import UserList from "./userList.js";

export default class HeaderContainer {
  constructor({ addUser, deleteUser, selectUser }) {
    this.onChangeUserList = addUser;

    this.userList = new UserList({
      addUser,
      deleteUser,
      selectUser,
    });

    this.$title = $("#user-title");
  }

  render = (userList, selectedUserId) => {
    const name = userList.find((user) => user._id === selectedUserId).name;
    this.userList.render(userList, selectedUserId);
    this.$title.dataset.username = name;
    this.$title.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
  };
}
