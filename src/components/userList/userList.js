'use strict';

import { userListController } from './controller/userListController.js';
class UserList {
  constructor() {
    // this.userListController = new UserListController();
  }

  init() {
    userListController.init();
  }
}

export default UserList;
