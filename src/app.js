import {$userCreateButton, $userList, $todoInput} from './todoDOM.js';
import {onUserCreateHandler} from './components/createUser.js';
import {loadUserList} from './components/loadUser.js';
import {changeActiveUser} from './components/userState.js';

import {addTodoItem} from './components/todoInput.js';

export const app = () => {
  loadUserList();
  
  $userCreateButton.addEventListener('click', onUserCreateHandler);
  $userList.addEventListener('click', changeActiveUser);
  $todoInput.addEventListener('keyup', addTodoItem);
}

