import Subject from "./Subject.js";

export default class UserStore extends Subject {
  constructor(userList, userInfo) {
    super();
    this.userList = userList ?? [];
    this.selectedUser = userInfo ?? "";
  }

  setSelectedUser(userInfo) {
    const [userData] = this.userList;
    this.selectedUser = userInfo ?? userData;
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
