'use strict'
const $ = selector => document.querySelector(selector);
const $userList = $('#user-list')
const $userTitle = $('#user-title strong')
const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const postOption = (name) => {
  return ({
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name
    })
  });
};

const userBtn = `
  <div> 
    <button class="ripple user-create-button" data-action="createUser">
    + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
    삭제 -
    </button>
  </div>
  `;

const loadUserList = () => {
  fetch(`${baseUrl}/api/users`)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      showUserList(data)
    })
    .catch(error => {
      console.log(error)
    })
};

const loadUserInformation = (users) => {
  const $userListbtns = document.querySelectorAll('button.ripple');
  [...$userListbtns].map(btn => {
    btn.dataset.id == users[0]._id ? btn.classList.add('active') : ''
  });
  alert(users[0].name)
  $('#user-title').dataset.username = users[0].name;
  $userTitle.innerText = users[0].name;
};

const userListTemplate = users => {
  let html = '';
  users.map(user =>
    html += `
      <button class="ripple" data-id="${user._id}" data-action="selectUser" selectuser="click">
        ${user.name}
      </button>`
  )
  html += userBtn
  return html
};

const showUserList = users => {
  const user = userListTemplate(users)
  $userList.innerHTML = user;

  loadUserInformation(users);

  const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    const flag = userName.length < 2 ? false : true;

    if (flag) {
      fetch(`${baseUrl}/api/users/`, postOption(userName))
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(data => {
          loadUserList()

        })
        .catch(error => {
          console.log(error)
        })
    } else {
      alert('2글자 이상이어야 합니다.');
    }
  };

  const onUserDeleteHandler = () => {
    alert('delete');
  }

  const $userCreateButton = document.querySelector('.user-create-button');
  const $userDeleteButton = document.querySelector('.user-delete-button');
  $userCreateButton.addEventListener('click', onUserCreateHandler);
  $userDeleteButton.addEventListener('click', onUserDeleteHandler);
};

const init = () => {
  loadUserList();
}

init();


