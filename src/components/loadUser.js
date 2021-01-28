import { API } from '../api/api.js';

const userTemplate = ({ name, todoList }) => {
  return `<button class="ripple">${name}</button>`;
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
