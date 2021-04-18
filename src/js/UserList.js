/* eslint-disable class-methods-use-this */
import { BASE_URL, USER_PATH, USERLIST, $ } from './constants.js';

class TodoList {
  constructor() {
    this.userInfos = {};
    this.init();
  }

  handleClickUser(event) {
    const { target } = event;
    const userButtons = USERLIST.querySelectorAll('button[data-active]');
    userButtons.forEach(userButton => {
      if (userButton.classList.contains('active')) {
        userButton.classList.remove('active');
      }
    });
    target.classList.add('active');
    // active 유저 불러오기
  }

  async init() {
    await this.render();
    // todo: first user todo render
    const userCreateButton = document.querySelector('.user-create-button');
    const userButtons = USERLIST.querySelectorAll('button');
    const firstUserButton = userButtons[0];

    firstUserButton.classList.add('active');
    userCreateButton.addEventListener('click', this.handleCreateUser);
    userButtons.forEach(userButton => {
      if (!userButton.hasAttribute('data-action'))
        userButton.addEventListener('click', this.handleClickUser.bind(this));
    });
  }

  async createUser(userName) {
    const user = { name: userName };
    const response = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }

  async handleCreateUser() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    await this.createUser(userName);
    this.render();
  }

  appendUserInfoButton(user) {
    return `
		<button class="ripple" data-id="${user._id}" data-active>${user.name}</button>
		`;
  }

  async returnUsers() {
    const response = await fetch(`${BASE_URL}${USER_PATH}`);
    const users = await response.json();
    return users;
  }

  deleteExistingUserButtons() {
    const userButtonCount =
      $('#user-list').querySelectorAll('button').length - 2;
    for (let i = 0; i < userButtonCount; i++) {
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

export default TodoList;
