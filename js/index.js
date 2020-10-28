import { UserList } from "./component/userList.js"
import TodoInput from "./component/todoInput.js"
import TodoCount from "./component/todoCount.js"
new class {
  constructor(){
    this.userList = new UserList();
    this.userList.loadUserList();
  }
}
