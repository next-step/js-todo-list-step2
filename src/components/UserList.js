import api from '../api/api.js';
import UserItem from './UserItem.js';

const MINIMUN_USER_LENGTH = 2;

class UserList {
  constructor() {
    this.$userList = document.querySelector('#user-list');
    this.$userCreateButton = document.querySelector('.user-create-button');
  }

  init() {
    this.renderUsers();
    this.$userCreateButton.addEventListener('click', this.addUser);
  }

  async renderUsers() {
    const users = await api.getUsers();
    const usersHTML = users.map((user) => UserItem.render(user.name));
    this.$userList.insertAdjacentHTML('afterbegin', usersHTML.join('\n'));
  }

  async addUser() {
    const userName = prompt('이름을 입력해주세요');
    userName.trim();

    if (userName.length > MINIMUN_USER_LENGTH) {
      const newUser = await api.addUser(userName);
      this.renderUsers();
    }
  }
}

const userList = new UserList();

export default userList;
