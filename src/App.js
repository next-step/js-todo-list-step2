import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";

export default function App() {
  const users = [{ name: "eastjun", active: true }];

  const activeUser = (selectedUser) => {
    users.forEach((user) => (user.active = false));
    selectedUser.active = true;
  };

  const selectUser = (userName) => {
    const selectedUser = users.find(({ name }) => name === userName);
    activeUser(selectedUser);
    render();
  };

  const createUser = (userName) => {
    const newUser = {
      name: userName,
      active: true,
    };
    users.push(newUser);
    activeUser(newUser);

    render();
  };

  const userTitle = UserTitle();
  const userList = UserList({ selectUser, createUser });

  const render = () => {
    userList.render(users);
    userTitle.render(users);
  };

  render();
}
