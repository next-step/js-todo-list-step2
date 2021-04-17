import { SELECTOR, ACTION_NAME, POPUP_MESSAGE } from '../utils/constant.js';
import { $ } from '../utils/dom.js';
import { isAvailableUserName, isAvailableUser } from '../utils/validations.js';
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

  onClick({ target }) {
    const action = target.dataset.action;
    if (action) {
      return action === ACTION_NAME.CREATE_USER
        ? this.createUser()
        : confirm(POPUP_MESSAGE.REMOVE_USER(this.store.currentUserName)) &&
            this.removeUser();
    }
    const userId = target.dataset.id;
    userId && this.selectUser(userId);
  }

  selectUser(userId) {
    this.store.setCurrentUser(userId);
  }

  async createUser() {
    try {
      const userName = prompt(POPUP_MESSAGE.CREATE_USER)?.trim();
      if (!userName) return;
      isAvailableUserName(userName);
      const user = await api.addUser(userName);
      this.store.addUser(user);
    } catch (error) {
      return alert(error);
    }
  }

  async removeUser() {
    try {
      const userId = this.store.currentUserId;
      isAvailableUser(userId);
      await api.removeUser(userId);
      this.store.removeUser(userId);
    } catch (error) {
      return alert(error);
    }
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
