'use strict';

import { $ } from '../utils/dom.js';
import { userStore } from '../model/userStore.js';
import { userListView } from '../view/userListView.js';
import { todoListView } from '../view/todoListView.js';
import { todoFilterController } from './todoFilterController.js';
import { todoListController } from './todoListController.js';
import { ElementValidator } from '../validator/validator.js';
import {
  FILTER_TYPE,
  MINIMUM_USER_NAME_LENGTH,
} from '../constant/constants.js';
import {
  INPUT_USER_NAME,
  ALERT_USER_NAME,
  DELETE_USER,
} from '../constant/message.js';

class UserListController {
  constructor() {
    this.$userList = $('#user-list');
    this.$userList.addEventListener('click', this.onClickUserList);
  }

  onClickUserList = ({ target }) => {
    if (ElementValidator.isNotRipple(target)) return;
    if (ElementValidator.isAddUserBtn(target)) {
      this.addUser();
    } else if (ElementValidator.isDeleteUserBtn(target)) {
      this.deleteUser();
    } else {
      todoListView.showProgress();
      this.selectUserBtn(target);
    }
  };

  async addUser() {
    const userName = prompt(INPUT_USER_NAME);
    if (!userName) return;
    if (userName.length < MINIMUM_USER_NAME_LENGTH) {
      return alert(ALERT_USER_NAME);
    }
    await userStore.addUser(userName);
    this.loadUsers();
  }

  async deleteUser() {
    if (!confirm(DELETE_USER)) return;
    const id = $('.active', this.$userList).id;
    await userStore.deleteUser(id);
    this.loadUsers();
  }

  async selectUserBtn(target) {
    const $selectedBtn = $('.active', this.userList);
    const userName = target.innerText;
    const userID = target.id;
    userListView.activeUserBtn(target);
    userListView.deactiveUserBtn($selectedBtn);
    userListView.updateUserTitle(userName);
    todoFilterController.changeFilterBtn(FILTER_TYPE.ALL);
    await todoListController.loadUserItems(userID); // 지연 발생 체크하기
    userStore.setCurrentUserID(userID);
  }

  async loadUsers() {
    const users = await userStore.getUsers();
    const firstUserID = users[0]._id;
    userListView.renderUserBtns(users);
    todoListController.loadUserItems(firstUserID);
    userStore.setCurrentUserID(firstUserID);
  }

  init() {
    this.loadUsers();
  }
}

export const userListController = new UserListController();
