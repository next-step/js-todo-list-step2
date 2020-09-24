import { getter } from '../../store/index.js';
import { loadingWrapper } from '../../utils.js';
import { setter } from '../../store/index.js';
import { observer } from '../../store/index.js';

const setUser = (event) => {
  const userId = event.target.dataset.index;
  userId && loadingWrapper(() => setter.user(userId));
};

const UserList = () => {
  const dom = document.createElement('div');
  dom.classList.add('user-list');
  dom.addEventListener('click', setUser);

  const render = () => {
    const userId = getter.userId();
    const userList = getter.userList();
    const btnStyle = (id) => userId === id ? 'active' : '';

    dom.innerHTML = `${ userList.map((user) =>
      `<button data-index="${ user._id }" 
        class="ripple ${ btnStyle(user._id) }">
        ${ user.name }
    </button>`).join('') }`;
  };
  observer.addObserver('user', render);

  render();
  return dom;
};

export default UserList;