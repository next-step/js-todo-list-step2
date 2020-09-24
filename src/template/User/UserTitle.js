import { getter, observer, initStore } from '../../store/index.js';
import { removeUser } from '../../endpoint/service.js';
import { loadingWrapper } from '../../utils.js';

const UserTitle = () => {
  const dom = document.createElement('div');

  const deleteUser = async (event) => {
    if (event.target.dataset.component === 'user-delete') {
      const confirm = window.confirm('유저를 정말로 삭제하시겠습니까?');
      if (!confirm) return;
      try {
        const userId = getter.userId();
        loadingWrapper(async () => {
          await removeUser({ userId });
          await initStore();
        });
      } catch (err) {
        alert(err.message);
      }
    }
  };

  dom.addEventListener('click', deleteUser);
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