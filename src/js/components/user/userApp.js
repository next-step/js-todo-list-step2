import { ADD_USER, DELETE_USER, GET_USERS } from "../../setting/api.js";
import { User, parseUser } from "./user.js";
import UserEditor from "./UserEditor.js";
import UserList from "./UserList.js";
import UserTitle from "./userTitle.js";

export default function UserApp(todoApp) {
  const userEditor = new UserEditor(this);
  const userList = new UserList(this);
  const userTitle = new UserTitle();
  let users = [];
  let activeUser;

  this.render = async () => {
    const getUsers = await GET_USERS();
    users = getUsers.map(user => parseUser(user));

    users.forEach(user => user.inActivate());
    activeUser = activeUser ?? users[0];
    users.find(user => user.matchId(activeUser.getId())).activate();

    userList.render(users);
  }

  this.add = async name => {
    const user = await ADD_USER(name);
    activeUser = parseUser(user);
    changeActive();
    this.render();
  }

  this.delete = async () => {
    await DELETE_USER(activeUser.getId());
    activeUser = users[0];
    changeActive();
    this.init();
  }

  this.active = id => {
    activeUser = users.find(user => user.matchId(id));
    changeActive();
    this.init();
  }

  const changeActive = () => {
    const name = activeUser.getName();
    userTitle.render(name);
    userEditor.changeUser(name);
  }

  this.init = async () => {
    await this.render();
    todoApp.init(activeUser);
  }

}
