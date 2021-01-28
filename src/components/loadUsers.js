import { API } from '../api/api.js';

const userTemplate = ({ name, _id }) => {
  return `<button class="ripple" data-id=${_id}>${name}</button>`;
};

export const loadUsers = () => {
  const $userList = document.querySelector('#user-list');
  const users = API.getUsers();

  users.then((users) => {
    users.map((user) => {
      $userList.insertAdjacentHTML('afterbegin', userTemplate(user));
    });
  });
};
