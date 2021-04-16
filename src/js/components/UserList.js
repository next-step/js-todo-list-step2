import {
  SELECTOR,
  ACTION_NAME,
  USER_NAME_ERROR,
  CREATE_USER_PROMPT,
} from '../utils/constant.js';
import { isAvailableUserName } from '../utils/validations.js';
import { userListTemplate } from '../utils/templates.js';
import api from '../api/index.js';

class UserList {
  constructor(store) {
    this.store = store;
    this.container = document.querySelector(SELECTOR.USER_LIST);
    this.activeUserId = this.store.currentUserId;
    this.render();
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener('click', ({ target }) => {
      const action = target.dataset.action;
      if (action) {
        return action === ACTION_NAME.CREATE_USER
          ? this.onCreateUser()
          : this.onRemoveUser();
      }
    });
  }

  onSelectUser() {}

  async onCreateUser() {
    try {
      const userName = prompt(CREATE_USER_PROMPT).trim();
      if (!isAvailableUserName(userName)) {
        return window.alert(USER_NAME_ERROR);
      }
      const result = await api.addUser(userName);
      if (result.isError) {
        return window.alert(result.errorMessage);
      }
      this.store.addUser(result.data);
      this.render();
    } catch (error) {}
  }

  onRemoveUser() {}

  render() {
    this.container.innerHTML = userListTemplate(
      this.store.userList,
      this.activeUserId,
    );
  }
}

export default UserList;
