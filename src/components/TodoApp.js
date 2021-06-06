import { addUserData, deleteUserData, getUsersData } from '../api.js';
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
        const newUser = await addUserData({ name });
        await this.loadUsers();
        this.activeUser = this.users.find((user) => user._id === newUser._id);
        this.render();
      },
      onDelete: async () => {
        const confirmation = window.confirm(`${this.activeUser.name}을 삭제하시겠습니까?`);
        if (confirmation === false) return;
        await deleteUserData(this.activeUser._id);
        this.initUsers();
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
