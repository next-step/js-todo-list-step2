import { UserList } from "./userList.js"
import TodoInput from "./todoInput.js"
import TodoCount from "./todoCount.js"
new class {
  constructor(){
    this.userList = new UserList();
    this.userList.loadUserList();
  }
}
