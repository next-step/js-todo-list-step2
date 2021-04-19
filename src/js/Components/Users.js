import { postData } from '../helper/FetchApi.js';
import { POST_USER_URL } from '../Config/API.js';
import { isValidUserName } from '../helper/Validation.js';

function Users() {
  const onUserCreateHandler = () => {
    const userName = prompt(
      '추가하고 싶은 이름을 입력해주세요.\n(이름은 최소 2글자 이상이어야 합니다.)'
    );

    if (!isValidUserName(userName)) {
      return alert(
        '‼️Error: 유저 추가 실패\n이름은 최소 2글자 이상이어야 합니다.'
      );
    }

    return postData(POST_USER_URL, { name: userName }).then((data) =>
      console.log(data)
    );
  };

  const userCreateButton = document.querySelector('.user-create-button');
  userCreateButton.addEventListener('click', onUserCreateHandler);
}

export default Users;
