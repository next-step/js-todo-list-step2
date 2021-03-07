'use strict';

import { API } from '../api/api.js';

class UserStore {
  constructor() {
    this.currentUserID = '';
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

  setCurrentUserID(id) {
    this.currentUserID = id;
  }
}

export const userStore = new UserStore();
