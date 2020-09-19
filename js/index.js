import { UserList } from "./userList.js"
import TodoInput from "./todoInput.js"
import { TodoCount } from "./todoCount.js"
import * as util from "./util.js";
new class {
  constructor(){
    this.userList = new UserList();
    this.userList.loadUserList();
    new TodoCount();
  }
}
