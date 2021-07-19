import { $ } from '../utils/selectors.js';

function userItemTemplate(user,currentUser) {
  return `
    <button class="ripple ${user._id === currentUser._id && 'active'}" data-id=${user._id}>${user.name}</button>
  `;
}

function UserList({ userSelecteHandler }) {
  this.render = (loadUsers, currentUser) => {
    const userList = $('#user-list');
    userList.innerHTML = loadUsers.map(user => userItemTemplate(user, currentUser)).join('');
    userList.addEventListener('click', userSelecteHandler);
  };
}

export default UserList;
