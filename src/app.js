import {$userCreateButton, $userDeleteButton,$userList, $todoInput} from './todoDOM.js';
import {userList, userState, newUser, userEdit} from './components/user.js';
import {todo} from './components/todo.js';

import {getSelectedUserTodo} from './components/todoList.js';


export const app = () => {
  
  userList.load();

  $userCreateButton.addEventListener('click', newUser.handler);
  $userDeleteButton.addEventListener('click', userEdit.remove);

  $userList.addEventListener('click', userState.change);
  $userList.addEventListener('click', getSelectedUserTodo);

  $todoInput.addEventListener('keyup', todo.addItem);
}

