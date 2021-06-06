import HeaderContainer from "./component/header/headerContainer.js";
import TodoListContainer from "./component/todo/todoListContainer.js";
import requests from "./util/fetch.js";

export default class App {
  // constructor() {
  //   const userData = requests.get("/users/co_E3OYed").then((res) => res);
  //   console.dir(userData);
  // }

  userList = [{ _id: "Mp2jurL72", name: "yt" }];
  addUser = ({ _id, name }) => {
    this.userList.push({ _id, name });
    this.render();
  };

  // deleteUser = ({ _id }) => {
  //   const index = this.userList.findIndex((user) => user._id === _id);
  //   this.userList.splice(index, 1);
  // };

  selectedUserInfo = {};
  setSelectedUserInfo = (data) => {
    this.selectedUserInfo = data;
    this.render();
  };

  headerContainer = new HeaderContainer({ addUser: this.addUser });
  todoListContainer = new TodoListContainer();

  render = async () => {
    this.selectedUserInfo = await requests.get("/users/Mp2jurL72");
    console.dir(this.selectedUserInfo);
    this.headerContainer.render(this.userList, this.selectedUserInfo);
    this.todoListContainer.render(this.selectedUserInfo);
  };
}
