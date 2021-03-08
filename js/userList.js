const userList = () => {
  const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
  const $userTitle = document.getElementById('user-title');
  const $userList = document.getElementById('user-list');
  const _userMap = new Map();
  let _currentUser = {};

  const _onUserCreateHandler = () => {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    const jsonBody = JSON.stringify({ name: userName });

    const p = fetch(BASE_URL + '/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: jsonBody,
    });

    p.then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      return response.json();
    }).then((user) => {
      _setUser(user);
      listUsers();
    });
  };

  const _setUser = (user) => {
    _userMap.set(user._id, user);
  };

  const _onUserDeleteHandler = () => {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return;
    }

    const userId = _currentUser._id;

    fetch(BASE_URL + '/api/users/' + userId, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      _userMap.delete(userId);
      _currentUser = {};
      listUsers();
    });
  };

  const _onClickUserHandler = ({ target }) => {
    const userId = target.dataset.id;

    fetch(BASE_URL + '/api/users/' + userId)
      .then((response) => {
        if (!response.ok) {
          return new Error(response);
        }
        return response.json();
      })
      .then((user) => {
        _currentUser = user; //TODO todoList와는 동기가 보장되어야함
        $userTitle.dataset.username = _currentUser.name;
        $userTitle.querySelector('span>strong').innerHTML = _currentUser.name;
        //refresh todoList();
      });
  };

  const init = () => {
    fetch(BASE_URL + '/api/users')
      .then((response) => {
        if (!response.ok) {
          return new Error(response);
        }
        return response.json();
      })
      .then((users) => {
        users
          .map((item) => ({ ...item }))
          .forEach((user) => {
            _userMap.set(user._id, user);
          });
      })
      .then(() => listUsers());

    $userList
      .querySelector('.user-create-button')
      .addEventListener('click', _onUserCreateHandler);

    $userList
      .querySelector('.user-delete-button')
      .addEventListener('click', _onUserDeleteHandler);
  };

  const listUsers = () => {
    $userList.querySelector('.user-span').innerHTML = '';
    Array.from(_userMap.values())
      .map((user) => {
        const $button = document.createElement('button');
        $button.classList.add('ripple');
        $button.textContent = user.name;
        $button.dataset.id = user._id;
        $button.addEventListener('click', _onClickUserHandler);
        return $button;
      })
      .forEach((element) => {
        $userList.querySelector('.user-span').appendChild(element);
      });
  };

  //   const _createAddButton = () => {
  //     const $addButton = document.createElement('button');
  //     $addButton.classList.add('ripple', 'user-create-button');
  //     $addButton.innerText = '+ 유저 생성';
  //     $addButton.addEventListener('click', _onUserCreateHandler);

  //     $userList.appendChild($addButton);
  //   };

  return {
    init,
    listUsers,
  };
};

export default userList;
