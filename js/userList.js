const userList = (createUser, deleteUser, selectUser) => {
  const $userTitle = document.getElementById('user-title');
  const $userList = document.getElementById('user-list');
  const $userSpan = $userList.querySelector('.user-span');

  const _onUserCreateHandler = () => {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    if (name.length < 2) {
      alert('2글자 이상 입력해주세요');
      return;
    }
    createUser(name);
  };

  const _onUserDeleteHandler = () => {
    if (!$userTitle.dataset.username) {
      alert('선택된 유저가 없습니다.');
      return;
    }
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    deleteUser();
  };

  const _onClickUserHandler = ({ target }) => {
    const userId = target.dataset.id;
    selectUser(userId);
  };

  const listUsers = (userList) => {
    $userSpan.innerHTML = '';
    userList
      .map((user) => _createUserButton(user))
      .forEach((element) => {
        $userSpan.appendChild(element);
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

  const setTitleName = (name) => {
    if (!name) {
      delete $userTitle.dataset.username;
      $userTitle.innerHTML = 'Todo List App';
      return;
    }
    $userTitle.dataset.username = name;
    $userTitle.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
  };

  $userList
    .querySelector('.user-create-button')
    .addEventListener('click', _onUserCreateHandler);

  $userList
    .querySelector('.user-delete-button')
    .addEventListener('click', _onUserDeleteHandler);

  return {
    listUsers,
    setTitleName,
  };
};

export default userList;
