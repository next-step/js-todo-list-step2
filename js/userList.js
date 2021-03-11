import { userStore } from './store.js';

const userList = (setState) => {
  const $userTitle = document.getElementById('user-title');
  const $userList = document.getElementById('user-list');

  const _store = userStore();

  const _onUserCreateHandler = async () => {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    if (name.length < 2) {
      alert('2글자 이상 입력해주세요');
      return;
    }
    await _store.createUser(name);
    _listUsers();
  };

  const _onUserDeleteHandler = async () => {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    await _store.deleteUser();
    _listUsers();
  };

  const _onClickUserHandler = async ({ target }) => {
    const userId = target.dataset.id;

    const user = await _store.setUser(userId);
    $userTitle.dataset.username = user.name;
    $userTitle.innerHTML = `<span><strong>${user.name}</strong>'s Todo List</span>`;
    setState();
  };

  const _listUsers = async () => {
    $userList.querySelector('.user-span').innerHTML = '';

    const userList = await _store.getUsers();
    userList
      .map((user) => _createUserButton(user))
      .forEach((element) => {
        $userList.querySelector('.user-span').appendChild(element);
      });
  };

  const _createUserButton = (user) => {
    const $button = document.createElement('button');
    $button.classList.add('ripple');
    $button.textContent = user.name;
    $button.dataset.id = user._id;
    $button.addEventListener('click', _onClickUserHandler);
    return $button;
  };

  const init = () => {
    _listUsers();

    $userList
      .querySelector('.user-create-button')
      .addEventListener('click', _onUserCreateHandler);

    $userList
      .querySelector('.user-delete-button')
      .addEventListener('click', _onUserDeleteHandler);
  };

  return {
    init,
  };
};

export default userList;
