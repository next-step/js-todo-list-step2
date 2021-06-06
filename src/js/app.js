import HeaderContainer from "./component/header/headerContainer.js";
import requests from "./util/fetch.js";

export default class App {
  userList = [];

  currentUser = {};

  setUserList = (newUser) => {
    this.userList.push(newUser);
    this.render();
  };

  headerContainer = new HeaderContainer({ onChangeUserList: this.setUserList });

  render = () => {
    this.headerContainer.render(this.userList);
  };
}
