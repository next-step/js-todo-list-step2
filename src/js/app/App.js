import { api } from '../api/api.js';
import TodoApp from '../components/todo/TodoApp.js';
import UserList from '../components/user/UserList.js';

export default class App {
  constructor() {
    this.appData = [];
    this.init();
  }

  init() {
    api.getUser().then((data) => {
      this.appData = data;
      this.userList = new UserList({
        appData: this.appData,
        onSelectUser: this.handleSelectUser.bind(this),
        onCreateUser: this.handleCreateUser.bind(this),
      });
      this.todoApp = new TodoApp({
        todoData: this.appData[0].todoList ? this.appData[0].todoList : [],
      });
      this.render();
    });
  }

  handleGetAllUser = async () => {
    await api.getUser().then((data) => {
      this.appData = data;
    });
    this.render();
  };

  handleCreateUser = async (name) => {
    await api.setUser(name);
    this.handleGetAllUser();
  };

  handleSelectUser = async (id) => {
    const user = await api.getUser(id).then((data) => data);
    this.todoApp.setState(user.todoList);
  };

  render() {
    this.userList.setState(this.appData);
  }
}
