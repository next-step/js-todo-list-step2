import { $ } from '../../utils/common.js';

export default function UserList() {
  this.$Users = [];
  this.$UsersDom = $('#user-list');

  this.setState = (users) => {
    this.$Users = users;
    this.render();
  }

  this.render = () => {
    const users = this.$Users.map(user => template(user));
    this.$UsersDom.innerHTML += users.join('');

    const userCreateButton = document.createElement('button');
    userCreateButton.classList.add('ripple', 'user-create-button');
    userCreateButton.textContent = '+ 유저 생성';

    const userDeleteButton = document.createElement('button');
    userDeleteButton.classList.add('ripple', 'user-delete-button');
    userDeleteButton.textContent = '삭제 -';

    this.$UsersDom.appendChild(userCreateButton);
    this.$UsersDom.appendChild(userDeleteButton);
  }
}

function template(user) {
  const userTemplate = `<button class="ripple" data-_id="${user.id}">${user.name}</button>`;

  return userTemplate;
}