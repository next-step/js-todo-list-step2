import { $ } from '../../utils/common.js';
import { onUserHandler, rippleActiveHandler } from '../../utils/event.js';

export default function UserList() {
  this.$Users = [];
  this.$UsersDom = $('#user-list');

  this.setState = (users = []) => {
    this.$Users = users;
    this.render();
  }

  this.render = () => {
    const users = Array.from(this.$Users).map(user => template(user));
    this.$UsersDom.innerHTML += users.join('');

    const userButtons = document.createElement('div');
    userButtons.style.display = 'inline-block';
    
    const userCreateButton = document.createElement('button');
    userCreateButton.classList.add('ripple', 'user-create-button');
    userCreateButton.textContent = '+ 유저 생성';
    userButtons.appendChild(userCreateButton);

    const userDeleteButton = document.createElement('button');
    userDeleteButton.classList.add('ripple', 'user-delete-button');
    userDeleteButton.textContent = '삭제 -';
    userButtons.appendChild(userDeleteButton);

    this.$UsersDom.appendChild(userButtons);
    this.$UsersDom.addEventListener('click', onUserHandler);
    rippleActiveHandler(this.$UsersDom.firstChild);
  }
}

function template(user) {
  const userTemplate = `<button class="ripple" data-_id="${user._id}">${user.name}</button>`;

  return userTemplate;
}