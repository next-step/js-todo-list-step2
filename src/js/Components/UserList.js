import { isValidUserName } from '../helper/Validation.js';

function UserList({ onCreate }) {
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

  const userCreateButton = document.querySelector('.user-create-button');
  userCreateButton.addEventListener('click', createUser);

  this.render = (items = []) => {};
}

export default UserList;
