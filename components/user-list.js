export default class UserList {
  constructor(changeUser) {
    this.userListElement = document.querySelector('#user-list');
    this.users = [];
    this.selectedUser = '';
    this.changeUser = changeUser;

    this.applyEvent();
  }

  applyEvent() {
    this.userListElement.addEventListener('click', ({ target }) => {
      if (target.classList.contains('ripple')) {
        const targetUser = target.textContent.trim();
        this.changeUser(targetUser);
      }
    });
  }

  setUsers(users) {
    this.users = users;
    this.render();
  }

  selectUser(userName) {
    this.selectedUser = userName;
    this.render();
  }

  render() {
    const usersElementsText = this.users.map((user) => {
      return `
        <button class="${
          user.name === this.selectedUser ? 'ripple active' : 'ripple'
        }">
          ${user.name}
        </button>
      `;
    });
    this.userListElement.innerHTML = usersElementsText.join('');
  }
}
