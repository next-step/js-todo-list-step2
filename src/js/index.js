'use strict'
const $ = selector => document.querySelector(selector);
const $userList = $('#user-list');
const $userTitle = $('#user-title strong');
const $todoList = $('.todo-list');
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

const loadUserList = async () => {
  const response = await fetch(`${baseUrl}/api/users`);
  return response.json();
}

const changeTitle = user => {
  $('#user-title').dataset.username = user.name;
  $userTitle.innerText = user.name;
};

const defaultLoadUserInformation = (users) => {
  const $userListbtns = document.querySelectorAll('button.ripple');
  [...$userListbtns].map(btn => {
    btn.dataset.id == users[0]._id ? btn.classList.add('active') : ''
  });
  alert("첫번째 유저명" + users[0].name);
  changeTitle(users[0]);
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

const onUserSelectHandler = e => {
  const userBtnId = e.target.dataset.id
  const $userListbtns = document.querySelectorAll('button.ripple');

  [...$userListbtns].map(btn => {
    userBtnId == btn.dataset.id ? btn.classList.add('active') : btn.classList.remove('active')
  });

  loadUserList().then(users => {
    users.map(user => {
      if (userBtnId == user._id) {
        changeTitle(user);
        //loadToDos(); 투두 구현후 ㄱㄱ
      }
    })
  })

}

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
        init()
      })
      .catch(error => {
        console.log(error)
      })
  } else {
    alert('2글자 이상이어야 합니다.');
  }
};

const onUserDeleteHandler = () => {
  const targetId = $('button.active').dataset.id
  alert(targetId)
  fetch(`${baseUrl}/api/users/${targetId}`, {
    method: "DELETE"
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    init();
  })
    .catch(error => {
      console.log(error)
    });
}

const showUserList = users => {
  const user = userListTemplate(users)
  $userList.innerHTML = user;

  defaultLoadUserInformation(users);

  const $userCreateButton = document.querySelector('.user-create-button');
  const $userDeleteButton = document.querySelector('.user-delete-button');
  $userList.addEventListener('click', e => {
    if (e.target.dataset.action == 'selectUser') {
      onUserSelectHandler(e);
    };
  });
  $userCreateButton.addEventListener('click', onUserCreateHandler);
  $userDeleteButton.addEventListener('click', onUserDeleteHandler);
};

const init = () => {
  const allUsersPromise = loadUserList();
  allUsersPromise.then(users => showUserList(users));
}

init();