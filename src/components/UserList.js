import api from '../api/api.js';
import UserAddButton from './UserAddButton.js';
import UserItem from './UserItem.js';

const MINIMUN_USER_LENGTH = 2;

class UserList {
  constructor() {
    this.$userList = document.querySelector('#user-list');
  }

  init() {
    this.renderUsers();
    this.$userList.addEventListener('click', this.addUser);
  }

  async renderUsers() {
    const users = await api.getUsers();
    const userButtons = users.map((user) => UserItem.render(user.name));
    userButtons.push(UserAddButton.render());
    this.$userList.insertAdjacentHTML('afterbegin', userButtons.join('\n'));
  }

  async addUser({ target }) {
    if (target.classList.contains('user-create-button')) {
      const userName = prompt('이름을 입력해주세요');
      userName.trim();

      if (userName.length > MINIMUN_USER_LENGTH) {
        // const newUser = await api.addUser(userName);
        await api.addUser(userName);
        this.renderUsers();
      }
    }
  }
}

const userList = new UserList();

export default userList;
