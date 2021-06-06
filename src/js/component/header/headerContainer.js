import UserList from "./userList.js";

export default class HeaderContainer {
  constructor({ onChangeUserList }) {
    this.onChangeUserList = onChangeUserList;

    this.userList = new UserList({
      addUser: this.onChangeUserList,
      deleteUser: () => {},
      changeCurrentUser: () => {},
    });
  }

  render = (userList) => {
    this.userList.render(userList);
  };
}
