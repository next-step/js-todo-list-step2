import { UserList } from "./userList.js"
import TodoInput from "./todoInput.js"
import * as util from "./util.js";
new class {
  constructor(){
    this.userList = new UserList();
    this.userList.loadUserList();
  }
}
