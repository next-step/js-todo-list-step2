import { getter } from '../../store/index.js';
import { observer } from '../../store/index.js';
import { deleteUserService } from '../../endpoint/service.js';
import { loadingWrapper } from '../../utils.js';
import { setter } from '../../store/index.js';

const UserTitle = () => {
  const dom = document.createElement('div');

  const deleteUser = async (event) => {
    if (event.target.dataset.component === 'user-delete') {
      await deleteUserService(getter.userId());
      await loadingWrapper(async () => {
        await setter.userList();
        setter.user();
      });
    }
  };
  dom.addEventListener('click', deleteUser);

  const render = () => {
    const userName = getter.userName();
    const getTitleName = userName ? `${ userName }\'s` : '';

    dom.innerHTML = `
    <h1 data-username="${ userName }">
      <span><strong>${ getTitleName }</strong>Todo List</span>
      <span data-component="user-delete" class="user-delete">X</span>
    </h1>
  `;
  };
  observer.addObserver('user', render);

  return { dom, render };
};

export default UserTitle;