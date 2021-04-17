/* eslint-disable class-methods-use-this */
import { BASE_URL, USER_PATH, $ } from './constants.js';

// const UserList = function () {
class UserList {
  constructor() {
    this.userInfos = {};
    this.init();
  }

  async init() {
    const userCreateButton = document.querySelector('.user-create-button');
    this.currentUsers = await this.returnUsers();
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

  appendUserInfoButton(user) {
    return `
		<button class="ripple" data-id="${user._id}">${user.name}</button>
		`;
  }

  async returnUsers() {
    const response = await fetch(`${BASE_URL}${USER_PATH}`);
    const users = await response.json();
    return users;
  }

  deleteExistingUserButtons() {
    const buttonCount = $('#user-list').querySelectorAll('button').length - 1;
    for (let i = 0; i < buttonCount; i++) {
      const button = $('#user-list').querySelector('button');
      $('#user-list').removeChild(button);
    }
  }

  drawUserButtons() {
    this.userInfos.forEach(userInfo => {
      $('#user-list').insertAdjacentHTML(
        'afterbegin',
        this.appendUserInfoButton(userInfo)
      );
    });
  }

  renderUserButtons() {
    this.deleteExistingUserButtons();
    this.drawUserButtons();
  }

  async render() {
    this.userInfos = await this.returnUsers();
    this.renderUserButtons();
  }
}

export default UserList;
