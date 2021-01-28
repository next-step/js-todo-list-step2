import { API } from '../api/api.js';

const userTemplate = ({ name, _id }) => {
  return `<button class="ripple" data-id=${_id}>${name}</button>`;
};

export const loadUser = () => {
  const $userList = document.querySelector('#user-list');
  const users = API.loadUsers();

  users.then((users) => {
    users.map((user) => {
      $userList.insertAdjacentHTML('afterbegin', userTemplate(user));
    });
  });
};
