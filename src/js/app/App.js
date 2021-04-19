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
      this.appData[0].isSelected = true;
      this.selectedUserId = this.appData[0]._id;
      this.userList = new UserList({
        appData: this.appData,
        onSelectUser: this.handleSelectUser.bind(this),
        onCreateUser: this.handleCreateUser.bind(this),
        onDeleteUser: this.handleDeleteUser.bind(this),
      });
      this.todoApp = new TodoApp({
        userId: this.selectedUserId,
      });
    });
  }

  handleGetAllUser = async () => {
    await userApi.getUser().then((data) => {
      this.appData = data;
    });
    this.render();
  };

  handleCreateUser = async (name) => {
    await userApi.setUser(name);
    this.handleGetAllUser();
  };

  handleSelectUser = async (userId) => {
    // const user = await api.getUser(id).then((data) => data);
    this.appData.forEach((data) => (data.isSelected = false));
    const user = this.appData.find((data) => data._id === userId);
    user.isSelected = true;
    this.selectedUserId = userId;
    this.todoApp.setUserId(userId);
    this.render();
  };

  handleDeleteUser = async () => {
    const targetId = this.appData.find((data) => data.isSelected)._id;
    await userApi.deleteUser(targetId);
    this.handleGetAllUser();
  };

  render() {
    this.userList.setState(this.appData);
  }
}
