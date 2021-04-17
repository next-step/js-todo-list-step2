/* eslint-disable class-methods-use-this */
import { BASE_URL, USER_PATH, $ } from './constants.js';

class UserList {
  constructor() {
    this.userInfos = {};
    this.init();
  }

  async init() {
    const userCreateButton = document.querySelector('.user-create-button');
    this.currentUserInfos = await this.returnUserInfo();
    userCreateButton.addEventListener('click', this.onUserCreateHandler);
    this.render();
  }

  static async createUser(userName) {
    const user = { name: userName };
    const response = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }

  async onUserCreateHandler() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    await this.createUser(userName);
    this.render();
  }

  appendUserInfoBtn(user) {
    return `
		<button class="ripple" data-id="${user._id}">${user.name}</button>
		`;
  }

  async returnUserInfo() {
    const response = await fetch(`${BASE_URL}${USER_PATH}`);
    const users = await response.json();
    return users;
  }

  async render() {
    this.userInfos = await this.returnUserInfo();
    // this.deleteExistingUserBtn(this.userInfos);
    this.userInfos.forEach(userInfo => {
      $('#user-list').insertAdjacentHTML(
        'afterbegin',
        this.appendUserInfoBtn(userInfo)
      );
    });
  }
}

export default UserList;
