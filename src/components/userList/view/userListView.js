'use strict';

import { $ } from '../../../utils/dom.js';

class UserListView {
  constructor() {
    this.$userList = $('#user-list');
    this.userList = [];
  }

  renderUserBtns(users) {
    const buttons = users.map(this.userButtonTemplate);
    this.$userList.innerHTML =
      buttons.join('\n') + this.addDeleteButtonTemplate();

    this.activeUserBtn(this.$userList.firstChild); // 왜 동작이 안되지...??
    // const $firstUserBtn = this.$userList.firstChild;
    // $firstUserBtn.classList.add('active');
  }

  addUser() {}

  deleteUser() {}

  selectUser() {}

  activeUserBtn(target) {
    // const $userBtn = $(`#${id}`);
    target.classList.add('active');
  }

  deactiveUserBtn(target) {
    // const $userBtn = $(`#${id}`);
    target.classList.remove('active');
  }

  userButtonTemplate({ name, _id }) {
    return `<button class="ripple" id=${_id}>${name}</button>`;
  }

  addDeleteButtonTemplate() {
    return `
      <button class="ripple user-create-button">+ 유저 생성</button>
			<button class="ripple user-delete-button">- 유저 삭제</button>
    `;
  }
}

export const userListView = new UserListView();
