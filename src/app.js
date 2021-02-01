import {$userCreateButton, $userList, $todoInput} from './todoDOM.js';
import {loadUser, userState, newUser} from './components/user.js';
import {addTodoItem} from './components/todoInput.js';


export const app = () => {
  
  loadUser.list();

  $userCreateButton.addEventListener('click', newUser.handler);
  $userList.addEventListener('click', userState.change);
  $todoInput.addEventListener('keyup', addTodoItem);
}

