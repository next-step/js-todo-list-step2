'use strict';

import { $ } from '../../../utils/dom.js';
import { ElementValidator } from '../../../validator/validator.js';
import { API } from '../../../api/api.js';
import { userListView } from '../view/userListView.js';

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
      console.log('delete user');
      this.deleteUser();
    } else {
      this.selectUserBtn(target);
    }
  };

  async addUser() {
    const userName = prompt('유저 이름을 입력해주세요.');
    if (!userName) return;
    if (userName.length < 2) {
      return alert('유저 이름은 두글자 이상이어야 합니다.');
    }
    await API.addUser(userName);
    this.loadUsers();
  }

  async deleteUser(id) {
    if (!confirm('현재 선택된 유저를 삭제하시겠습니까?')) return;
    const selectedUser = document.querySelector('.active');
    await API.deleteUser(selectedUser.id);
    this.loadUsers();
  }

  selectUserBtn(target) {
    const $selectedBtn = $('.active', this.userList);
    const userName = target.innerText;
    userListView.activeUserBtn(target);
    userListView.deactiveUserBtn($selectedBtn);
    userListView.updateUserTitle(userName);
  }

  async loadUsers() {
    const users = await API.getUsers();
    userListView.renderUserBtns(users);
  }

  init() {
    this.loadUsers();
  }
}

export default UserListController;
