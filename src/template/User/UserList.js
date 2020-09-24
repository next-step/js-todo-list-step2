import { getter, observer } from '../../store/index.js';
import { setUserHandler } from '../../eventHandler.js';
import { createDOM } from '../../utils.js';

const UserList = () => {
  const dom = createDOM(
    'div',
    {
      className: 'user-list',
    },
  );
  dom.addEventListener('click', setUserHandler);

  const render = () => {
    const userId = getter.userId();
    const userList = getter.userList();
    const btnStyle = (id) => userId === id ? 'active' : '';

    dom.innerHTML = `${userList.map((user) =>
      `<button data-index="${user._id}" 
        class="ripple ${btnStyle(user._id)}">
        ${user.name}
    </button>`).join('')}`;
  };
  observer.addObserver('user', render);

  render();
  return dom;
};

export default UserList;