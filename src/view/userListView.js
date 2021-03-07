'use strict';

import { $ } from '../utils/dom.js';

class UserListView {
  constructor() {
    this.$userList = $('#user-list');
    this.$userTitle = $('#user-title');
  }

  renderUserBtns(users) {
    const buttons = users.map(this.userButtonTemplate);
    // const $firstUser = this.$userList.firstChild; // 왜 안되지?
    // const firstUserName = $firstUser.innerText;
    this.$userList.innerHTML =
      buttons.join('\n') + this.addDeleteButtonTemplate();
    this.activeUserBtn(this.$userList.firstChild);
    this.updateUserTitle(this.$userList.firstChild.innerText);
  }

  updateUserTitle(userName) {
    this.$userTitle.innerHTML = this.userTitleTemplate(userName);
  }

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

  userTitleTemplate(userName) {
    return `
		<span>
			<strong>${userName}</strong>'s Todo List
		</span>
	`;
  }
}

export const userListView = new UserListView();
