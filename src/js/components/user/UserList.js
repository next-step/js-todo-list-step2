import { $ } from '../../utils/common.js';
import { onUserSelected } from '../../utils/events.js';
import { onUserCreateHandler, onUserDeleteHandler } from '../../utils/events.js';

export function UserList() {
  this.$userTitle = $('#user-title');
  this.$userContainer = $('#user-list');
  this.$users = [];

  this.setState = (updateUsers) => {
    this.$users = Array.from(updateUsers);
    this.$userContainer.addEventListener('click', onUserSelected);

    this.rander();
  }
  
  this.rander = () => {
    const userList = this.$users.map(user => `<button class="ripple" data-_id="${user._id}">${user.name}</button>`).join('');

    this.$userContainer
        .insertAdjacentHTML('afterbegin', userList);

    if (!this.$userContainer.querySelector('.active')) {
      this.$userContainer.firstChild.classList.add('active');
      this.$userTitle.dataset.username = this.$userContainer.firstChild.innerText;
    }
    
    this.$userTitle.querySelector('strong').innerText = this.$userTitle.dataset.username;
  }

  const userCreateButton = document.querySelector('.user-create-button');
  userCreateButton.addEventListener('click', onUserCreateHandler);

  const userDeleteButton = document.querySelector('.user-delete-button');
  userDeleteButton.addEventListener('click', onUserDeleteHandler);
}
