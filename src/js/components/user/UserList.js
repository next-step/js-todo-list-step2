export default class UserList {
  constructor({ appData, onSelectUser, onCreateUser, onDeleteUser }) {
    this.userListEl = document.querySelector('#user-list .users');
    this.userCreateButton = document.querySelector('.user-create-button');
    this.userDeleteButton = document.querySelector('.user-delete-button');
    this.appData = appData;
    this.handleSeleteUser = onSelectUser;
    this.handleCreateUser = onCreateUser;
    this.handleDeleteUser = onDeleteUser;

    this.render();
    this.init();
  }

  init() {
    this.userListEl.addEventListener('click', ({ target }) => {
      this.handleSeleteUser(target.id);
    });

    this.userCreateButton.addEventListener('click', () => {
      const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
      if (userName.trim().length < 2) {
        alert('User의 이름은 최소 2글자 이상이어야 합니다.');
        return;
      }
      this.handleCreateUser(userName);
    });

    this.userDeleteButton.addEventListener('click', () => {
      this.handleDeleteUser();
    });
  }

  setState(appData) {
    this.appData = appData;
    this.render();
  }

  handleActiveUser() {}

  render() {
    this.userListEl.innerHTML = this.appData
      .map((data) => {
        return `<button id="${data._id}" class="ripple ${
          data.isSelected ? 'active' : ''
        }">${data.name}</button>`;
      })
      .join('');
  }
}
