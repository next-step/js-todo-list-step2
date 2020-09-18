import UserList from './UserList.js';
import { onUserCreateHandler } from '../../endpoint/service.js';
import { validateUserName } from '../../utils.js';

const UserListContainer = () => {

  const dom = document.createElement('section');

  const components = {
    UserList: UserList(),
  };
  const userCreateButton = document.createElement('button');
  userCreateButton.classList.add('ripple', 'user-create-button');
  userCreateButton.innerText = '+ 유저 생성';
  dom.appendChild(components.UserList.dom);
  dom.appendChild(userCreateButton);

  components.UserList.render();

  userCreateButton.addEventListener('click', () => onUserCreateHandler(validateUserName));


  return {
    dom
  };
};

export default UserListContainer;

