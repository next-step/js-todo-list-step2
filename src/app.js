import {createUser} from './components/createUser.js';
import {loadUserList} from './components/loadUser.js';
import {$userCreateButton, $userList} from './todoDOM.js';
import {changeActiveUser, setActive} from './components/userState.js';

export const app = () => {
  loadUserList();
  
  $userCreateButton.addEventListener('click', onUserCreateHandler);
  $userList.addEventListener('click', changeActiveUser);
}

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

  createUser(userName);
  setActive();
}
