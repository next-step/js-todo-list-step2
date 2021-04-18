import { User } from "./user.js";
import UserEditor from "./UserEditor.js";
import UserList from "./UserList.js";
import UserTitle from "./userTitle.js";

export default function UserApp(todoApp) {
  const userEditor = new UserEditor(this);
  const userList = new UserList(this, userEditor);
  const userTitle = new UserTitle();
  const users = [];
  let idGenerator = 0;
  let activeUser;

  this.render = () => {
    userList.render(users);
  }

  this.add = name => {
    users.push(new User(idGenerator++, name, []));
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
    todoApp.init(activeUser == null ? [] : activeUser.getTodoList());
    this.render();
  }
}