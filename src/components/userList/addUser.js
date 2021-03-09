import { API } from '../../api/api.js';
import { MINIMUM_USER_NAME_LENGTH } from '../../constant/user.js';
import { loadUsers } from './loadUsers.js';

export const addUser = async () => {
  const userName = prompt('유저 이름을 입력해주세요.');
  if (userName.length < MINIMUM_USER_NAME_LENGTH) {
    return alert('유저 이름은 두글자 이상이어야 합니다!');
  }
  await API.addUser(userName);
  loadUsers();
};
