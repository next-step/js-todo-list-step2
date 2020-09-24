import UserList from './UserList.js';
import { createUser } from '../../endpoint/service.js';
import { validateUserName, loadingWrapper } from '../../utils.js';
import { setter } from '../../store/index.js';

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

  const onUserCreateHandler = async (validator) => {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    if (name === null) return;

    await validator(name, onUserCreateHandler);

    try {
      const user = await createUser({ name });
      loadingWrapper(async () => {
        await setter.userList();
        await setter.user(user._id);
      });
    }
    catch (err) {
      alert(err.message);
    }
  };

  userCreateButton.addEventListener('click', () => onUserCreateHandler(validateUserName));


  return {
    dom
  };
};

export default UserListContainer;

