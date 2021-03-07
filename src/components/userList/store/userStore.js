'use strict';

import { API } from '../../../api/api.js';

class UserStore {
  constructor() {
    this.userList = [];
    this.currenUser = '';
  }

  async getUsers() {
    return await API.getUsers();
  }

  async addUser(userName) {
    await API.addUser(userName);
  }

  async deleteUser(id) {
    await API.deleteUser(id);
  }

  setCurrentUser() {}
}

export const userStore = new UserStore();
