import {createUser, loadUserList} from './components/user.js';
import {$userCreateButton} from './todoDOM.js';

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

  createUser(userName);
}

export const app = () => {
    loadUserList();
    
    $userCreateButton.addEventListener('click', onUserCreateHandler);
}
