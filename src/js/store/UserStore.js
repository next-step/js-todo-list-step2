import Subject from "./Subject.js";

export default class UserStore extends Subject {
  constructor(userList) {
    super();
    this.userList = userList ?? [];
  }
}
