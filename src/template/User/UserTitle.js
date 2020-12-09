import { getter, observer } from '../../store/index.js';
import { deleteUserHandler } from '../../eventHandler.js';

const UserTitle = () => {
  const dom = document.createElement('div');

  dom.addEventListener('click', deleteUserHandler);
  const render = () => {
    const userName = getter.userName();
    const getTitleName = userName ? `${userName}\'s` : '';
    dom.innerHTML = `
    <h1 data-username="${userName}">
      <span><strong>${getTitleName}</strong>Todo List</span>
      ${userName ? `<span data-component="user-delete" class="user-delete">X</span>` : ''}
    </h1>
  `;
  };
  observer.addObserver('user', render);

  render();
  return dom ;
};

export default UserTitle;