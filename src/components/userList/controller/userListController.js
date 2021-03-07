'use strict';

import { $ } from '../../../utils/dom.js';
import { ElementValidator } from '../../../validator/validator.js';
import { userStore } from '../store/userStore.js';
import { userListView } from '../view/userListView.js';
import { MINIMUM_USER_NAME_LENGTH } from '../../../constant/constants.js';

class UserListController {
  constructor() {
    this.$userList = $('#user-list');
    this.$userList.addEventListener('click', this.onClickUserList);
  }

  onClickUserList = ({ target }) => {
    if (ElementValidator.isNotRipple(target)) return;
    if (target.classList.contains('user-create-button')) {
      this.addUser();
    } else if (target.classList.contains('user-delete-button')) {
      this.deleteUser();
    } else {
      this.selectUserBtn(target);
    }
  };

  async addUser() {
    const userName = prompt('유저 이름을 입력해주세요.');
    if (!userName) return;
    if (userName.length < MINIMUM_USER_NAME_LENGTH) {
      return alert('유저 이름은 두글자 이상이어야 합니다.');
    }
    await userStore.addUser(userName);
    this.loadUsers();
  }

  async deleteUser() {
    if (!confirm('현재 선택된 유저를 삭제하시겠습니까?')) return;
    const id = $('.active', this.$userList).id;
    await userStore.deleteUser(id);
    this.loadUsers();
    alert('선택된 유저가 삭제되었습니다.');
  }

  selectUserBtn(target) {
    const $selectedBtn = $('.active', this.userList);
    const userName = target.innerText;
    userListView.activeUserBtn(target);
    userListView.deactiveUserBtn($selectedBtn);
    userListView.updateUserTitle(userName);
  }

  async loadUsers() {
    const users = await userStore.getUsers();
    userListView.renderUserBtns(users);
  }

  init() {
    this.loadUsers();
  }
}

export default UserListController;
