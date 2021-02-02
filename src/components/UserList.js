import UserAddButton from './UserAddButton.js';
import UserDeleteButton from './UserDeleteButton.js';
import UserItem from './UserItem.js';
import usersStore, { ADD_USER, DELETE_USER } from '../modules/users.js';
import selectedUserStore, { GET_USER } from '../modules/selectedUser.js';

const MINIMUN_USER_LENGTH = 2;

const UserList = async () => {
  const $userList = document.querySelector('#user-list');

  const onAddUser = async ({ target }) => {
    if (target.classList.contains('user-create-button')) {
      const name = prompt('이름을 입력해주세요');
      if (name === null) {
        return;
      }
      if (name.trim().length < MINIMUN_USER_LENGTH) {
        alert(`닉네임은 ${MINIMUN_USER_LENGTH}자 이상 입력해야 합니다.`);
        return;
      }

      usersStore.dispatch({ type: ADD_USER, payload: { name } });
    }
  };

  const onSelectUser = async ({ target }) => {
    const userId = target.dataset.id;
    if (target.classList.contains('user')) {
      selectedUserStore.dispatch({ type: GET_USER, payload: { userId } });
    }
  };

  const selectFirstUser = async () => {
    const { _id: userId } = await usersStore.getState()[0];
    await selectedUserStore.dispatch({ type: GET_USER, payload: { userId } });
  };

  const onDeleteUser = async ({ target }) => {
    if (target.classList.contains('user-delete-button')) {
      const userId = await selectedUserStore.getState()._id;
      await usersStore.dispatch({ type: DELETE_USER, payload: { userId } });
      await selectFirstUser();
    }
  };

  const render = async () => {
    const users = await usersStore.getState();
    const userButtons = users.map((user) => UserItem.render(user._id, user.name));
    userButtons.push(UserAddButton.render(), UserDeleteButton.render());
    $userList.innerHTML = userButtons.join('\n');
  };

  $userList.addEventListener('click', onAddUser);
  $userList.addEventListener('click', onSelectUser);
  $userList.addEventListener('click', onDeleteUser);

  usersStore.subscribe(ADD_USER, render);
  usersStore.subscribe(DELETE_USER, render);
  selectedUserStore.subscribe(GET_USER, render);

  // initialize
  if (selectedUserStore.getState()._id === null) {
    await selectFirstUser();
  }
  render();
};

export default UserList;
