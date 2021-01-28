import { API } from '../api/api.js';
import { MINIMUM_USER_NAME_LENGTH } from '../constant/user.js';

const inputUserName = () => {
  const userName = prompt('유저 이름을 입력해주세요.');
  if (userName.length < MINIMUM_USER_NAME_LENGTH) {
    return alert('유저 이름은 두글자 이상이어야 합니다!');
  }
  API.addUser(userName);
};

export const addUser = async () => {
  const $userCreateButton = document.querySelector('.user-create-button');

  $userCreateButton.addEventListener('click', inputUserName);
};
