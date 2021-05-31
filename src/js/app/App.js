import { userApi } from '../api/api.js';
import TodoApp from '../components/todo/TodoApp.js';
import UserList from '../components/user/UserList.js';

export default class App {
  constructor() {
    this.appData = [];
    this.selectedUserId = '';
    this.init();
  }

  init() {
    userApi.getUser().then((data) => {
      this.appData = data;
      this.selectedUserId = this.appData[0]._id;
      this.userList = new UserList({
        appData: this.appData,
        selectedUserId: this.selectedUserId,
        onSelectUser: this.handleSelectUser.bind(this),
        onCreateUser: this.handleCreateUser.bind(this),
        onDeleteUser: this.handleDeleteUser.bind(this),
      });
      this.todoApp = new TodoApp({
        userId: this.selectedUserId,
      });
    });
  }

  handleGetAllUser() {
    userApi.getUser().then((data) => {
      this.appData = data;
      this.selectedUserId = this.appData[0]._id;
      this.render();
    });
  }

  handleCreateUser = async (name) => {
    await userApi.setUser(name);
    this.handleGetAllUser();
  };

  handleSelectUser(userId) {
    this.selectedUserId = userId;
    this.render();
  }

  handleDeleteUser = async (userId) => {
    await userApi.deleteUser(userId);
    this.handleGetAllUser();
  };

  render() {
    this.userList.setState(this.appData, this.selectedUserId);
    this.todoApp.setUserId(this.selectedUserId);
  }
}
