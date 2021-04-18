import { User } from "./user.js";
import UserList from "./UserList.js";

export default function UserApp() {
  const userList = new UserList(this);
  const users = [];
  let idGenerator = 0;
  let activeId = 0;

  this.render = () => {
    userList.render(users);
  }

  this.add = name => {
    users.push(new User(idGenerator++, name, []));
    this.render();
  }

  this.active = id => {
    activeId = id;
    users.forEach(user => user.inActivate());
    users.find(user => user.matchId(id)).activate();
    this.render();
  }

  this.init = () => {
    this.render();
  }
}