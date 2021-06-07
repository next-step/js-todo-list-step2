'use strict'
const $ = selector => document.querySelector(selector);
const $userList = $('#user-list');
const $userTitle = $('#user-title strong');
const $todoList = $('.todo-list');
const $todoInput = $('.new-todo');
const $filters = $('.filters');

const $allSelectedBtn = $('.all');
const $activeBtn = $('.active');
const $completedBtn = $('.completed');

const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const userCreateOption = (name) => {
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

const toDoItemCreateOption = (content) => {
  return ({
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "contents": content
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

const CountToDo = (items) => {
  const $toDoCount = $('.todo-count');
  let count = items.then(items =>
    $toDoCount.children[0].innerText = items.length)
};

const AddToDo = (contents) => {
  const targetId = $('button.active').dataset.id;
  fetch(`${baseUrl}/api/users/${targetId}/items/`, toDoItemCreateOption(contents));
}

/* start 아이템 불러오기 */
const toDoItemTemplate = (item) => {
  return (
    `
    <li data-id="${item._id}">
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="label">
          <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
          ${item.contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>
    `
  );
}

const toDoRender = itemsPromise => {
  $todoList.innerHTML = '';
  itemsPromise.then(items =>
    items.map(item =>
      $todoList.innerHTML += toDoItemTemplate(item)
    ),
  );
}

const loadToDoItems = async (id) => {
  const toDoItems = await fetch(`${baseUrl}/api/users/${id}/items/`);
  return toDoItems.json();
};
/* end 아이템 불러오기 */

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
        const toDoItems = loadToDoItems(user._id);
        toDoRender(toDoItems);
        CountToDo(toDoItems);
      }
    })
  })

}

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const flag = userName.length < 2 ? false : true;

  if (flag) {
    fetch(`${baseUrl}/api/users/`, userCreateOption(userName))
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

$todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (e.target.value.length < 2) {
      alert('2글자 이상이어야 합니다.');
    } else {
      AddToDo(e.target.value);
      e.target.value = "";
    }
  }
  const targetId = $('button.active').dataset.id;
  const toDoItems = loadToDoItems(targetId);
  toDoRender(toDoItems);
  CountToDo(toDoItems);
});

const init = () => {
  const allUsersPromise = loadUserList();
  allUsersPromise.then(users => showUserList(users));
}

init();