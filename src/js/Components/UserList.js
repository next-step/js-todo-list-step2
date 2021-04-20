import { UserButtonTemplate } from '../Config/Template.js';
import { isValidUserName } from '../Helper/Validation.js';
import { subscribeUserList } from '../Store.js';

const UserList = ({ onCreate, onChangeUser }) => {
  const userListElement = document.getElementById('user-list');
  const userCreateButton = document.querySelector('.user-create-button');

  const createUser = () => {
    const userName = prompt(
      '추가하고 싶은 이름을 입력해주세요.\n(이름은 최소 2글자 이상이어야 합니다.)'
    );

    if (!isValidUserName(userName)) {
      return alert(
        '‼️Error: 유저 추가 실패\n이름은 최소 2글자 이상이어야 합니다.'
      );
    }

    return onCreate(userName);
  };

  const changeSelectedUser = (e) => {
    if (!e.target.dataset.type || e.target.dataset.type !== 'user') {
      return;
    }

    return onChangeUser(e.target.dataset);
  };

  const render = (userList, selectedUser) => {
    if (userList.length === 0) {
      return;
    }

    [...userListElement.children].map(
      (element) => element.dataset.type === 'user' && element.remove()
    );

    const selectedIndex = userList.indexOf(selectedUser);

    userListElement.insertAdjacentHTML(
      'afterbegin',
      userList
        .map((user, index) => UserButtonTemplate(user, index === selectedIndex))
        .join('')
    );
  };

  userListElement.addEventListener('click', changeSelectedUser);
  userCreateButton.addEventListener('click', createUser);

  subscribeUserList(render);
};

export default UserList;
