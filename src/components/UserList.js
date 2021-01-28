import { addUser } from '../api/api.js';

const MINIMUN_USER_LENGTH = 2;

class UserList {
  constructor() {
    this.$userList = document.querySelector('#user-list');
    this.$userCreateButton = document.querySelector('.user-create-button');
  }

  init() {
    this.$userCreateButton.addEventListener('click', this.addUser);
  }

  async addUser() {
    const userName = prompt('이름을 입력해주세요');
    userName.trim();

    if (userName.length > MINIMUN_USER_LENGTH) {
      console.log(await addUser(userName));
    }
  }
}

const userList = new UserList();

export default userList;
