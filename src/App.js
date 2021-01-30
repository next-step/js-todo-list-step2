import store from "./store/index.js";

import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";

export default function App() {
  const selectUser = (user) => {
    store.userState.selectUser(user);
    render();
  };

  const createUser = (userName) => {
    store.userState.createUser(userName);
    render();
  };

  const userTitle = new UserTitle(store.userState.getSelectedUser());
  const userList = new UserList({ selectUser, createUser });

  const render = () => {
    const users = store.userState.getUsers();
    const { name } = store.userState.getSelectedUser();
    userList.render(users);
    userTitle.render(name);
  };

  render();
}
