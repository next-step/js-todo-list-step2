import Subject from "./Subject.js";

export default class UserStore extends Subject {
  constructor(userList, userName) {
    super();
    this.userList = userList ?? [];
    this.selectedUser = userName ?? "";
  }

  setSelectedUser(userName) {
    this.selectedUser = userName;
  }
}
