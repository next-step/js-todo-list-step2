import { API } from '../../api/api.js';
import { loadTodos } from '../todoList/loadTodos.js';

const addDeleteButtonTemplate = () => {
  return `<button class="ripple user-create-button">유저 생성 ✚</button>
          <button class="ripple user-delete-button">유저 삭제 X</button>`;
};

const userButtonTemplate = ({ name, _id }) => {
  return `<button class="ripple" data-id=${_id}>${name}</button>`;
};

export const loadUsers = async (selectedUser = '') => {
  const users = await API.getUsers();
  const $userList = document.querySelector('#user-list');

  const userButtons = users.map((user) => userButtonTemplate(user));
  $userList.innerHTML = userButtons.join('\n') + addDeleteButtonTemplate();

  if (!selectedUser) {
    const firstUser = $userList.firstChild;
    firstUser.classList.add('active');

    loadTodos(firstUser.dataset.id);
  } else {
    // $userList.querySelector('')
  }
};
