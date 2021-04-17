import { api } from '../api/TodoApi.js';
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
      this.setData(data);
    });
  }

  handleSelectUser(user) {}

  setData(data) {
    this.userList = new UserList({ appData: data });
    this.todoApp = new TodoApp({ appData: data });
  }
}
