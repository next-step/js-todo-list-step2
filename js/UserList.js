import api from './util/api.js';
import * as templates from './util/templates.js';
import { MESSAGE } from './util/constants.js';

export default class UserList {
  constructor({ username, userArray, $targetUserList, onClickUser }) {
    this.username = username;
    this.userArray = userArray;
    this.$targetUserList = $targetUserList;

    this.$targetUserList.addEventListener('click', (e) => {
      if (e.target.className === 'ripple') {
        onClickUser(e.target.textContent);
      }
    });
    this.render();
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.render();
  }
  async render() {
    this.$targetUserList.innerHTML = templates.LOADING;
    this.userArray = await api.fetchUsers();
    if (this.userArray.length === 0) {
      this.$targetUserList.innerHTML = MESSAGE.REGISTER_USER;
    } else {
      this.$targetUserList.innerHTML = templates.USERLIST(
        this.username,
        this.userArray,
      );
    }
  }
}
