import api from '../api/api.js';
import UserAddButton from './UserAddButton.js';
import UserRemoveButton from './UserRemoveButton.js';
import UserItem from './UserItem.js';
import usersStore, { ADD_USER } from '../modules/users.js';

const MINIMUN_USER_LENGTH = 2;

const UserList = () => {
  const $userList = document.querySelector('#user-list');

  const onAddUser = async ({ target }) => {
    if (target.classList.contains('user-create-button')) {
      const userName = prompt('이름을 입력해주세요');

      if (userName.trim().length <= MINIMUN_USER_LENGTH) {
        return alert('닉네임은 2자 이상 입력해야 합니다.');
      }

      usersStore.dispatch({ type: ADD_USER, payload: userName });
    }
  };

  const render = async () => {
    const users = await usersStore.getState();
    const userButtons = users.map((user) => UserItem.render(user.name));
    userButtons.push(UserAddButton.render(), UserRemoveButton.render());
    $userList.innerHTML = userButtons.join('\n');
  };

  $userList.addEventListener('click', onAddUser);

  usersStore.subscribe(ADD_USER, render);

  // 최초
  render();
};

// class UserList {
//   constructor() {
//     this.$userList = document.querySelector('#user-list');

//     this.addUser = async ({ target }) => {
//       if (target.classList.contains('user-create-button')) {
//         const userName = prompt('이름을 입력해주세요');

//         if (userName.trim().length <= MINIMUN_USER_LENGTH) {
//           return alert('닉네임은 2자 이상 입력해야 합니다.');
//         }
//         await api.addUser(userName);
//         this.renderUsers();
//       }
//     };
//   }

//   init() {
//     this.renderUsers();
//     this.$userList.addEventListener('click', this.addUser);
//   }

//   async renderUsers() {
//     const users = await api.getUsers();
//     const userButtons = users.map((user) => UserItem.render(user.name));
//     userButtons.push(UserAddButton.render());
//     this.$userList.innerHTML = userButtons.join('\n');
//   }
// }

// const userList = new UserList();

export default UserList;
