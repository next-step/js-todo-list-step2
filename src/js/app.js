import HeaderContainer from "./component/header/headerContainer.js";
import TodoListContainer from "./component/todo/todoListContainer.js";
import requests from "./util/fetch.js";

export default class App {
  init = async () => {
    this.userList = [{ _id: "slQAW-lSB", name: "yt" }];
    this.selectedUserInfo = await requests.get("/users/slQAW-lSB");
    console.dir(this.selectUser);
    this.render();
  };

  addUser = ({ _id, name }) => {
    this.userList.push({ _id, name });
    this.render();
  };

  deleteUser = (userid) => {
    const index = this.userList.findIndex((user) => user._id === userid);
    this.userList.splice(index, 1);
    this.render();
  };

  selectUser = (data) => {
    this.selectedUserInfo = data;
    this.render();
  };

  headerContainer = new HeaderContainer({
    addUser: this.addUser,
    deleteUser: this.deleteUser,
    selectUser: this.selectUser,
  });
  todoListContainer = new TodoListContainer();

  render = async () => {
    this.headerContainer.render(this.userList, this.selectedUserInfo);
    this.todoListContainer.render(this.selectedUserInfo);
  };
}
