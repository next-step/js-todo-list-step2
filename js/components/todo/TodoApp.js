import UserList from "../users/UserList.js";
import {requestUserList} from "../../utils/APIs.js";

export default function TodoApp() {

  this.start = async () => {
    const users = await requestUserList();
    new UserList({users}).render();
  }
}