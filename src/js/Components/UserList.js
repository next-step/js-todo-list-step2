import { UserButtonTemplate } from '../Config/Template.js';
import { isValidUserName } from '../Helper/Validation.js';
import {
  getSelectedUserId,
  getSelectedUserName,
  subscribeUserList,
} from '../Store.js';

const UserList = ({ onCreate, onChange, onDelete }) => {
  const userListElement = document.getElementById('user-list');
  const userCreateButton = document.querySelector('.user-create-button');
  const userDeleteButton = document.querySelector('.user-delete-button');

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

  const deleteUser = () => {
    const userId = getSelectedUserId();
    const userName = getSelectedUserName();

    const isDelete = confirm(`${userName}을 삭제하시겠습니까?`);
    if (isDelete) {
      return onDelete(userId);
    }
  };

  const changeSelectedUser = (e) => {
    if (!e.target.dataset.type || e.target.dataset.type !== 'user') {
      return;
    }

    return onChange(e.target.dataset);
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
  userDeleteButton.addEventListener('click', deleteUser);

  subscribeUserList(render);
};

export default UserList;
