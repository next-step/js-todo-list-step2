import User from "../components/user/User.js";
import { CLASS_NAME } from "../const/USER.js";
import { $ } from "../utils/element.js";

class UserApp {
  constructor(User, UserList) {
    this.$userList = $(CLASS_NAME.USER_LIST);
    this.User = User(this.$userList);
    this.UserList = UserList;

    this.users = [];
  }
  create() {
    this.updateUserList();
  }

  updateUserList() {
    this.users = api.updateUserList();
    // this.UserList.setState(this.users);
  }

  addUser() {
    this.User.setEvent({
      add: name => {
        api.addUser(name);
        this.updateUserList();
      },
      delete: (id) => {
        api.deleteUser(id);
        this.updateUserList();
      }
    })
  }
}

export default function() {
  new UserApp(User, 'UserList')
}