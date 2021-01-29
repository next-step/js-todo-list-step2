import { addUser } from './addUser.js';
import { deleteUser } from './deleteUser.js';
import { loadUsers } from './loadUsers.js';

const triggerClickUserList = ({ target }) => {
  if (target.classList.contains('user-create-button')) {
    addUser();
  } else if (target.classList.contains('user-delete-button')) {
    deleteUser();
  } else {
    // user select
  }
};

export const userList = () => {
  const $userList = document.querySelector('#user-list');

  $userList.addEventListener('click', triggerClickUserList);
};
