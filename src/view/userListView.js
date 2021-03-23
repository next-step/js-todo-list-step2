'use strict';

import { $ } from '../utils/dom.js';
import {
  userButtonTemplate,
  addDeleteButtonTemplate,
  userTitleTemplate,
} from '../layout/templates.js';

class UserListView {
  constructor() {
    this.$userList = $('#user-list');
    this.$userTitle = $('#user-title');
  }

  renderUserBtns(users) {
    const buttons = users.map(userButtonTemplate);
    // const $firstUser = this.$userList.firstChild; // 왜 안되지?
    // const firstUserName = $firstUser.innerText;
    this.$userList.innerHTML = buttons.join('\n') + addDeleteButtonTemplate();
    this.activeUserBtn(this.$userList.firstChild);
    this.updateUserTitle(this.$userList.firstChild.innerText);
  }

  updateUserTitle(userName) {
    this.$userTitle.innerHTML = userTitleTemplate(userName);
  }

  activeUserBtn(target) {
    target.classList.add('active');
  }

  deactiveUserBtn(target) {
    target.classList.remove('active');
  }
}

export const userListView = new UserListView();
