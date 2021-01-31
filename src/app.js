import {onUserCreateHandler} from './components/createUser.js';
import {loadUserList} from './components/loadUser.js';
import {$userCreateButton, $userList} from './todoDOM.js';
import {changeActiveUser} from './components/userState.js';

export const app = () => {
  loadUserList();
  
  $userCreateButton.addEventListener('click', onUserCreateHandler);
  $userList.addEventListener('click', changeActiveUser);
}

