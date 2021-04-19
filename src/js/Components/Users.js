import { postData } from '../helper/FetchApi.js';
import { POST_USER_URL } from '../Config/API.js';

function Users() {
  const onUserCreateHandler = () => {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    postData(POST_USER_URL, { name: userName }).then((data) =>
      console.log(data)
    );
  };

  const userCreateButton = document.querySelector('.user-create-button');
  userCreateButton.addEventListener('click', onUserCreateHandler);
}

export default Users;
