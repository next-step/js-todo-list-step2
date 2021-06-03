import { $ } from '../../utils/utils.js';
import { DOM_ID } from '../../constants/constants.js';

import { getUsers } from '../../api/user.js';

export default class User {
  constructor() {
    this.target = $(DOM_ID.USER_LIST);
    this.$createUserBtn = $(DOM_ID.CREATE_USER_BTN);

    this._addEvent();
    this.render();
  }

  _addEvent() {
    this.target.addEventListener('click', this.changeUser.bind(this));
    this.$createUserBtn.addEventListener('click', this.createUser.bind(this));
  }

  changeUser({ target }) {
    if (target.classList.length !== 1) return;

    // Change User Active
    const $usersList = this.target.querySelectorAll('button.ripple');
    [...$usersList].map((element) => element.classList.remove('active'));
    target.classList.add('active');

    // getUser and render todo
    // const userName = target.textContent;
  }

  createUser({ target }) {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    userName && userName.length < 2 && alert('유저 생성 오류 - 최소 2글자 이상이어야 합니다.');
  }

  async render() {
    const users = await getUsers();
    const userListHTMl = this.getUserTemplate(users);
    this.target.insertAdjacentHTML('afterbegin', userListHTMl);
  }

  getUserTemplate(users) {
    return users.reduce(
      (acc, userName) => (acc += ` <button class="ripple">${userName}</button>`),
      '',
    );
  }
}
