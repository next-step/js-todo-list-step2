import { addUserData, getUsersData } from '../api.js';
import UserList from './UserList.js';
import Username from './Username.js';

export default class TodoApp {
  constructor() {
    this.users = [];
    this.activeUser = { _id: '', name: '' };

    this.userList = new UserList({
      onSelect: ({ _id, name }) => {
        this.activeUser = { _id, name };
        this.render();
      },
      onAdd: async () => {
        const name = prompt('추가하고 싶은 이름을 입력해주세요.');
        if (name.length < 2) {
          window.alert('2글자 이상이어야 합니다.');
          return;
        }
        await addUserData({ name });
        await this.loadUsers();
        this.render();
      },
    });

    this.username = new Username();

    this.initUsers();
  }

  render() {
    const usersTemplate = this.users.map(this.getUserTemplate);
    this.userList.render(usersTemplate);
    this.username.render(this.activeUser.name);
  }

  getUserTemplate = ({ _id, name }) => {
    return `<button class="ripple ${_id === this.activeUser._id && 'active'}" id=${_id}>${name}</button>`;
  };

  async loadUsers() {
    this.users = await getUsersData();
  }

  async initUsers() {
    await this.loadUsers();
    this.activeUser = this.users[0];
    this.render();
  }
}
