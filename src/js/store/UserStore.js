import Subject from "./Subject.js";

export default class UserStore extends Subject {
  constructor(userList, userInfo) {
    super();
    this.userList = userList ?? [];
    this.selectedUser = userInfo ?? "";
  }

  setSelectedUser(userInfo) {
    const { _id, name } = this.userList[0];
    this.selectedUser = userInfo ?? { _id, name };
  }

  setNewUserList(newUserList) {
    const userList = [...newUserList];
    this.userList = userList;
  }

  get selectedUserId() {
    return this.selectedUser._id;
  }

  get selectedUserName() {
    return this.selectedUser.name;
  }
}
