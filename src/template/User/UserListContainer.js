import UserList from './UserList.js';
import { createDOM } from '../../utils.js';
import { createUserHandler } from '../../eventHandler.js';
import { validateUserName } from '../../validator.js';

const UserListContainer = () => {
  const dom = document.createElement('section');

  const userCreateButton = createDOM(
    'button',
    {
      className: 'ripple user-create-button',
      innerText: '+ 유저 생성',
    },
  );

  userCreateButton.addEventListener('click', () => createUserHandler(validateUserName));

  dom.append(
    UserList(),
    userCreateButton,
  );

  return dom;
};

export default UserListContainer;

