import store from './store.js';

const userList = (setState) => {
  const $userTitle = document.getElementById('user-title');
  const $userList = document.getElementById('user-list');

  const _onUserCreateHandler = () => {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    store()
      .createUser(name)
      .then(() => {
        _listUsers();
      });
  };

  const _onUserDeleteHandler = () => {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    store()
      .deleteUser()
      .then(() => {
        _listUsers();
      });
  };

  function _onClickUserHandler({ target }) {
    const userId = target.dataset.id;

    store()
      .setUser(userId)
      .then((user) => {
        $userTitle.dataset.username = user.name;
        $userTitle.innerHTML = `<span><strong>${user.name}</strong>'s Todo List</span>`;
        setState(); //TODO
      });
  }

  const _listUsers = () => {
    $userList.querySelector('.user-span').innerHTML = '';
    store()
      .getUsers()
      .then((userList) => {
        userList
          .map((user) => _createUserButton(user))
          .forEach((element) => {
            $userList.querySelector('.user-span').appendChild(element);
          });
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
