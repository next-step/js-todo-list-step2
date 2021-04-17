import {
  SELECTOR,
  ACTION_NAME,
  USER_NAME_ERROR,
  CREATE_USER_PROMPT,
} from '../utils/constant.js';
import { $ } from '../utils/dom.js';
import { isAvailableUserName } from '../utils/validations.js';
import { userListTemplate } from '../utils/templates.js';
import Observer from '../libs/Observer.js';
import api from '../api/index.js';

class UserList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = $(SELECTOR.USER_LIST);
    this.render();
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener('click', (e) => this.onClick(e));
  }

  async onClick({ target }) {
    try {
      const action = target.dataset.action;
      if (action) {
        return action === ACTION_NAME.CREATE_USER
          ? await this.createUser()
          : await this.removeUser();
      }
      const userId = target.dataset.id;
      userId && this.selectUser(userId);
    } catch (error) {}
  }

  selectUser(userId) {
    this.store.setCurrentUser(userId);
  }

  async createUser() {
    try {
      const userName = prompt(CREATE_USER_PROMPT).trim();
      if (!isAvailableUserName(userName)) {
        return alert(USER_NAME_ERROR);
      }
      const result = await api.addUser(userName);
      if (result.isError) {
        return alert(result.errorMessage);
      }
      this.store.addUser(result.data);
    } catch (error) {}
  }

  async removeUser() {
    try {
      const userId = this.store.currentUserId;
      const result = await api.removeUser(userId);
      if (result.isError) {
        return alert(USER_NAME_ERROR);
      }
      this.store.removeUser(userId);
    } catch (error) {}
  }

  update() {
    this.render();
  }

  render() {
    this.container.innerHTML = userListTemplate(
      this.store.userList,
      this.store.currentUserId,
    );
  }
}

export default UserList;
