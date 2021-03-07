'use strict';

import UserListController from './controller/userListController.js';
class UserList {
  constructor() {
    this.userListController = new UserListController();
  }

  init() {
    this.userListController.init();
  }
}

export default UserList;
