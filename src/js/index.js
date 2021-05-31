window.onload = () => {
  getUserList();
}

const $ = (selector) => document.querySelector(selector)

const apiUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const userList = $('#user-list');
const todoList = $('.todo-list');
const newTodoInput = $('.new-todo');
const userName = $('#user-title')
.getElementsByTagName('span')[0]
.getElementsByTagName('strong')[0];
const totalCount = $('.todo-count')
.getElementsByTagName('strong')[0];
const filters = $('.filters');
const clearCompletedButton = $('.clear-completed');


function getUserList() {
  fetch(apiUrl + '/api/users')
  .then((response) => response.json())
  .then((json) => addUserList(json));
}


function addUserList(data) {
  userList.innerHTML=``;

  for (const user of data) {
    userList.innerHTML += `<button class="ripple" onclick="selectUser('${user._id}', '${user.name}')" data-id="${user._id}" data-name="${user.name}">${user.name}</button>`;
  }
  userList.innerHTML += `<button class="ripple user-create-button" data-action="createUser" onclick="createUser()">  + 유저 생성</button>`;
  userList.innerHTML += `<button class="ripple user-delete-button" data-action="deleteUser" onclick="deleteUser()">  삭제 -</button>`;

  // 삭제 시 default
  getUserItems(data[0]._id);
  userName.innerHTML = data[0].name;
  userList.children[0].classList.add('active');
}


function createUser() {

  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(userName.length < 2 ){
    alert('사용자의 이름은 두글자 이상이여야 합니다.');
    return;
  }

  fetch(apiUrl + '/api/users', {
    method: 'POST',
    body: JSON.stringify({
      name : userName
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => getUserList());

}

function selectUser(id, name) {

  for(let i = 0; i < userList.children.length; i++) {
    if(userList.children[i].getAttribute('data-id') === id){
      userList.children[i].classList.add('active');
    }else{
      userList.children[i].classList.remove('active');
    }
  }

  userName.innerHTML = name;

  getUserItems(id);

}

function getUserItems(id) {
  fetch(apiUrl + '/api/users/' + id + '/items/')
  .then((response) => response.json())
  .then((json) => createUserItems(json));
}


function createUserItems(data) {

  todoList.innerHTML = '';

  for (const todo of data) {
    
    let html = '';

    if(todo.isCompleted) {
      html += `<li class="completed">`;
      html += `<div class="view">`;
      html += `<input class="toggle" type="checkbox" checked="" data-id="${todo._id}"/>`;
    }else {
      html += `<li>`;
      html += `<div class="view">`;
      html += `<input class="toggle" type="checkbox" data-id="${todo._id}"/>`;
    }

    html += `<label class="label" data-contents="${todo.contents}">`;

    if(todo.priority === 'FIRST') {
      html += `<span class="chip primary">1순위</span>`;
    }else if(todo.priority === 'SECOND') {
      html += `<span class="chip secondary">2순위</span>`;
    }else {
      html += `<select class="chip select" onchange="chipSelectChange('${todo._id}', this.value)">`;
      html += `<option value="0" selected>순위</option>`;
      html += `<option value="1">1순위</option>`;
      html += `<option value="2">2순위</option>`;
      html += `</select>`;
    }

    html += todo.contents;
    html += `</label>`;
    html += `<button class="destroy" data-id="${todo._id}"></button>`;
    html += `</div>`;
    html += `<input class="edit" value="${todo.contents}" data-id="${todo._id}"/>`;
    html += `</li>`;

    todoList.innerHTML += html;
  }

  totalCounting();

}


function deleteUser() {
  let id = findCurrentUserId();
  let name = findCurrentUserName();

  if(!confirm(name + '을 삭제하시겠습니까?')){
    return;
  }

  fetch(apiUrl + '/api/users/' + id, {
    method: 'DELETE'
  })
    .then(getUserList())

}


function findCurrentUserId() {
  let id = "";

  for(let i = 0; i < userList.children.length; i++) {
    if(userList.children[i].classList.value === 'ripple active'){
      id = userList.children[i].getAttribute('data-id');
      break;
    }
  }

  return id;
}


function findCurrentUserName() {
  let name = "";

  for(let i = 0; i < userList.children.length; i++) {
    if(userList.children[i].classList.value === 'ripple active'){
      name = userList.children[i].getAttribute('data-name');
      break;
    }
  }

  return name;
}


function removeTodoList(itemId) {
  const id = findCurrentUserId();

  fetch(apiUrl + '/api/users/' + id + '/items/' + itemId, {
    method: 'DELETE'
  })
  .then((response) => response.json())
  .then((json) => getUserItems(id));
}


function toggleTodoList(itemId) {
  const id = findCurrentUserId();

  fetch(apiUrl + '/api/users/' + id + '/items/' + itemId + '/toggle', {
    method: 'PUT'
  })
  .then((response) => response.json())
  .then((json) => getUserItems(id));
}


function updateUserItem(e) {
  const id = findCurrentUserId();
  const itemId = e.target.getAttribute('data-id');
  const itemContents = e.target.value;

  fetch(apiUrl + '/api/users/' + id + '/items/' + itemId, {
    method: 'PUT',
    body: JSON.stringify({
      contents: itemContents
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((response) => response.json())
  .then((json) => getUserItems(id));

}





function totalCounting() {
  totalCount.innerHTML = todoList.getElementsByTagName('li').length;
}


function chipSelectChange(itemId, chipValue) {
  const id = findCurrentUserId();

  const statusList = {
    0: 'NONE',
    1: 'FIRST',
    2: 'SECOND'
  };

  fetch(apiUrl + '/api/users/' + id + '/items/' + itemId + '/priority', {
    method: 'PUT',
    body: JSON.stringify({
      priority: statusList[chipValue]
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((response) => response.json())
  .then((json) => getUserItems(id));
}


// 입력폼에서 입력시 이벤트
newTodoInput.addEventListener('keyup', function(e) {
  if(e.key !== 'Enter' || newTodoInput.value === '' ){
    return;
  }
  if(newTodoInput.value.length < 2 ){
    alert('내용은 두글자 이상이여야 합니다.');
    return;
  }

  let id = findCurrentUserId();

  console.log(apiUrl + '/api/users/' + id + '/items/');

  fetch(apiUrl + '/api/users/' + id + '/items/', {
    method: 'POST',
    body: JSON.stringify({
      contents : newTodoInput.value
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => getUserItems(id));
  
  newTodoInput.value = '';
    
});


// TodoList Item 클릭시 이벤트
todoList.addEventListener('click', function(e) {
  const {className} = e.target;
  const itemId = e.target.getAttribute('data-id');

  switch (className) {
      case 'destroy':
          removeTodoList(itemId);
          break;
      case 'toggle':
          toggleTodoList(itemId);
          break;
  }

});


// TodoList Item 더블 클릭시 이벤트
todoList.addEventListener('dblclick', function(e) {
  const editedParentNode = e.target.parentNode;
  const {parentNode} = editedParentNode;

  if (e.target.className === 'label') {
      parentNode.classList.add('editing');
  }
});


// TodoList 수정폼에서 입력시 이벤트
todoList.addEventListener('keyup', function(e) {
  const {parentNode} = e.target;
  const contents = e.target.closest('li').querySelector('label').getAttribute('data-contents');

  switch (e.key) {
      case 'Escape':
          e.target.value = contents;
          parentNode.classList.remove('editing');
          break;
      case 'Enter':
          updateUserItem(e);
          break;
    }

});


// 필터 클릭시 이벤트
filters.addEventListener('click', function(e) {

  // 모든 filter 선택해제 -> 선택한 filter selected 추가
  for(let i = 0; i < filters.children.length; i++) {
      filters.children[i].firstElementChild.classList.remove('selected');
  }
  e.target.classList.add('selected');

  let count = 0;

  // 선택한 filter에 따른 액션
  switch (true) {
      case e.target.classList.contains('all'):
          console.log('all');
          for (let i = 0; i < todoList.children.length; i++) {
              todoList.children[i].classList.remove('hidden');
          }
          totalCounting();
          break;
      case e.target.classList.contains('active'):
          console.log('active');
          for (let i = 0; i < todoList.children.length; i++) {
              if (todoList.children[i].classList.contains('completed')) {
                  todoList.children[i].classList.add('hidden');
              } else {
                  todoList.children[i].classList.remove('hidden');
                  count++;
              }
          }
          totalCount.innerHTML = count;
          break;
      case e.target.classList.contains('completed'):
          console.log('completed');
          for (let i = 0; i < todoList.children.length; i++) {
              if (todoList.children[i].classList.contains('completed')) {
                  todoList.children[i].classList.remove('hidden');
                  count++;
              } else {
                  todoList.children[i].classList.add('hidden');
              }
          }
          totalCount.innerHTML = count;
          break;
    }
});


// '모두 삭제' 버튼 클릭시 이벤트
clearCompletedButton.addEventListener('click', function(e) {
  const id = findCurrentUserId();

  console.log(apiUrl + '/api/users/' + id + '/items/');

  fetch(apiUrl + '/api/users/' + id + '/items/', {
    method: 'DELETE'
  })
  .then((response) => response.json())
  .then((json) => getUserItems(id));

});
