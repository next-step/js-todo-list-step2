import api from './util/api.js';
import * as templates from './util/templates.js';

export default class UserList {
  constructor({ username, userArray, $targetUserContainer, onClickUser }) {
    this.username = username;
    this.userArray = userArray;
    this.$targetUserContainer = $targetUserContainer;

    this.$targetUserContainer.addEventListener('click', (e) => {
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
    this.userArray = await api.fetchUsers();
    this.$targetUserContainer.innerHTML = templates.USERLIST(
      this.username,
      this.userArray,
    );
  }
}
