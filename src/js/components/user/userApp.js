import { ADD_USER, GET_USERS } from "../../setting/api.js";
import { User, parseUser } from "./user.js";
import UserEditor from "./UserEditor.js";
import UserList from "./UserList.js";
import UserTitle from "./userTitle.js";

export default function UserApp(todoApp) {
  const userEditor = new UserEditor(this);
  const userList = new UserList(this, userEditor);
  const userTitle = new UserTitle();
  let users = [];
  let idGenerator = 0;
  let activeUser;

  this.render = async () => {
    const getUsers = await GET_USERS();
    users = getUsers.map(user => parseUser(user));
    userList.render(users);
  }

  this.add = async name => {
    const user = await ADD_USER(name);
    users.push(parseUser(user));
    this.render();
  }

  this.delete = () => {
    const index = users.indexOf(activeUser);
    users.splice(index, 1);
    activeUser = users[0];
    this.init();
  }

  this.active = id => {
    activeUser = users.find(user => user.matchId(id));
    const name = activeUser.getName();

    users.forEach(user => user.inActivate());
    users.find(user => user.matchId(id)).activate();

    this.init();
    userTitle.render(name);
    userEditor.changeUser(name);
  }

  this.init = () => {
    this.render();
    todoApp.init(activeUser);
  }
}