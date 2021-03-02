import UserList from "../users/UserList.js";
import RequestAPI from "../../utils/Request.js";
import {USERS} from "../../utils/Urls.js";

export default function TodoApp() {

  const renderUserList = async () => {
    return await RequestAPI.of(USERS.FIND_USERS).request();
  }

  this.start = async () => {
    const users = await renderUserList();
    new UserList({users}).render();
  }
}