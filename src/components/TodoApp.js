import { addUserData, deleteUserData, getUsersData } from '../api.js';
import TodoList from './TodoList.js';
import UserList from './UserList.js';
import Username from './Username.js';

export default class TodoApp {
  constructor() {
    this.users = [];
    this.activeUser = { _id: '', name: '', todoList: [] };

    this.userList = new UserList({
      onSelect: (userId) => {
        this.activeUser = this.users.find(({ _id }) => _id === userId);
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

    this.todoList = new TodoList();

    this.initUsers();
  }

  render() {
    this.userList.render(this.users, this.activeUser._id);
    this.username.render(this.activeUser.name);
    this.todoList.render(this.activeUser.todoList);
  }

  async loadUsers() {
    this.users = await getUsersData();
  }

  async initUsers() {
    await this.loadUsers();
    this.activeUser = this.users[0];
    this.render();
  }
}
