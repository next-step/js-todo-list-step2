'use strict';

import UserListController from './controller/userListController.js';
class UserListView {
  init() {
    const userListController = new UserListController();
    userListController.init();
  }
}

export default UserListView;
