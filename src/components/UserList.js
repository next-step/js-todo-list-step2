import api from '../api/api.js';
import UserAddButton from './UserAddButton.js';
import UserRemoveButton from './UserRemoveButton.js';
import UserItem from './UserItem.js';
import usersStore, { ADD_USER } from '../modules/users.js';
import selectedUserStore, { GET_USER } from '../modules/selectedUser.js';

const MINIMUN_USER_LENGTH = 2;

const UserList = async () => {
  const $userList = document.querySelector('#user-list');

  const onAddUser = async ({ target }) => {
    if (target.classList.contains('user-create-button')) {
      const userName = prompt('이름을 입력해주세요');
      if (userName === null) {
        return;
      }
      if (userName.trim().length < MINIMUN_USER_LENGTH) {
        alert('닉네임은 2자 이상 입력해야 합니다.');
        return;
      }

      usersStore.dispatch({ type: ADD_USER, payload: userName });
    }
  };

  const onSelectUser = async ({ target }) => {
    const userId = target.dataset.id;
    if (!target.classList.contains('user-create-button')) {
      selectedUserStore.dispatch({ type: GET_USER, payload: userId });
    }
  };

  const render = async () => {
    const users = await usersStore.getState();
    const userButtons = users.map((user) => UserItem.render(user._id, user.name));
    userButtons.push(UserAddButton.render(), UserRemoveButton.render());
    $userList.innerHTML = userButtons.join('\n');
  };

  $userList.addEventListener('click', onAddUser);
  $userList.addEventListener('click', onSelectUser);

  usersStore.subscribe(ADD_USER, render);
  selectedUserStore.subscribe(GET_USER, render);

  // initialize
  if (selectedUserStore.getState()._id === null) {
    const { _id: firstUserId } = usersStore.getState()[0];
    await selectedUserStore.dispatch({ type: GET_USER, payload: firstUserId });
  }
  render();
};

export default UserList;
