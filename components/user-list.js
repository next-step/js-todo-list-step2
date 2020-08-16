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
        const targetUser = target.textContent;
        this.changeUser(targetUser);
      }
    });
  }

  setUsers(users) {
    this.users = users;
    this.render();
  }

  selectUser(username) {
    this.selectedUser = username;
    this.activateUserButton();
  }

  activateUserButton() {
    Array.from(this.userListElement.children).forEach((userButton) => {
      if (userButton.textContent === this.selectedUser) {
        userButton.classList.add('active');
      } else {
        userButton.classList.remove('active');
      }
    });
  }

  render() {
    const usersElementsText = this.users.map((user) => {
      return `<button class="ripple">${user.name}</button>`;
    });
    this.userListElement.innerHTML = usersElementsText.join('');
  }
}
