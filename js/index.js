import { API } from './API.js';
import { userTemplate } from './template.js';

let currentUser = '';
let currentUserID = '';
let users = [];
let todoList = [];
let todoComplete = [];
let todoFilter = 'all';

const userCreateButton = document.querySelector('.user-create-button');
const userList = document.querySelector('div#user-list');
let currentUserButton = userList.querySelectorAll('button.ripple')[0];
let currentUserIndex = 0;

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if(userName.length < 2){
    alert("User의 이름은 최소 2글자 이상이어야 합니다.");
    return;
  }
  currentUserButton = document.querySelector('button.ripple.active');

  const newUser = userTemplate;
  newUser.name = userName;
  newUser.todoList = [];
  newUser._id = Math.random().toString(36).substr(2,10);
  users.push(newUser);
  addUser(newUser);
  API.addUser(newUser);

  if(currentUserButton){
    currentUser = currentUserButton.innerText;
  }
  else{
    currentUser = document.querySelector('button.ripple');
    currentUser.classList.add('active');
  }
  // currentUserButton = userList.querySelectorAll('button.ripple')[0];
  // currentUserIndex = 0;
  console.log(currentUserButton, currentUserIndex)
  onUserSelectHandler(currentUserButton, currentUserIndex);
}

userCreateButton.addEventListener('click', onUserCreateHandler);
userList.addEventListener('click', event => {
  userList.querySelectorAll('button.ripple').forEach(($user, index) => {
    if($user.contains(event.target)){
      onUserSelectHandler($user, index);
      // onUserDeleteHandler($user, index)
    }
  });
})

window.onload = () => {
  loadUserList();
}

const loadUserList = () => {
  API.fetchUserList()
    .then(response => response.json())
    .then(data => {
      users = data;
      init();
    })
    .catch(err => console.error(err));
}

const init = () => {
  renderUsers();
  currentUserButton = userList.querySelectorAll('button.ripple')[0];
  currentUserIndex = 0;
  onUserSelectHandler(currentUserButton, currentUserIndex);
  render();
}

const renderUsers = () => {
  users.forEach(user => addUser(user));

  const currentUserButton = document.querySelector('button.ripple.active');
  if(currentUserButton){
    currentUser = currentUserButton.innerText;
  }
  else{
    currentUser = document.querySelector('button.ripple');
    currentUser.classList.add('active');
  }
}

const addUser = user => {
  const newUserButton = document.createElement('button');
  newUserButton.classList.add('ripple');
  newUserButton.innerText = user.name;
  userCreateButton.insertAdjacentElement('beforebegin', newUserButton);
}

const onUserDeleteHandler = ($user, index) => {
  currentUserID = users[index]._id;
  console.log(currentUserID)

  API.deleteUser(currentUserID)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

  render();
}

const onUserSelectHandler = ($user, index) => {
  console.log($user);
  const currentUserButton = document.querySelector('button.ripple.active');
  if(currentUserButton) currentUserButton.classList.remove('active');
  $user.classList.add('active');

  currentUserID = users[index];

  API.fetchTodoList(currentUserID)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

  render();
}

const render = () => {
  const $todoList = document.querySelector('ul.todo-list');

  const todos = filterList();
  const renderList = todos.map(($item, index) => {
    if(!todoComplete[index]){
      return activeTemplate($item);
    }
    return completedTemplate($item);
  })
  $todoList.innerHTML = renderList.join(' ');

}

const filterList = () => {
  if(todoFilter === 'all') {
    return todoList;
  }
  if(todoFilter === 'active'){
    return todoList.filter(($item, index) => !todoComplete[index]);
  }
  if(todoFilter === 'completed'){
    return todoList.filter(($item, index) => todoComplete[index]);
  }
}

const activeTemplate = todoItem => `
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
              ${todoItem}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${todoItem} />
        </li>
`;

const completedTemplate = todoItem => `
        <li class="completed">
          <div class="view">
            <input class="toggle" type="checkbox" checked />
            <label class="label">${todoItem} </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${todoItem} />
        </li>
`;