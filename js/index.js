import { API } from './API.js';
import { userTemplate, itemTemplate } from './template.js';

let currentUser = '';
let currentUserID = '';
let users = [];
let todoList = [];
let todoFilter = 'all';

const $userTitle = document.querySelector('h1#user-title');
const userCreateButton = document.querySelector('.user-create-button');
const userDeleteButton = document.querySelector('.user-delete-button');
const $todoList = document.querySelector('ul.todo-list');
const $userList = document.querySelector('div#user-list');
let currentUserButton = $userList.querySelectorAll('button.ripple')[0];

const $newTodo = document.querySelector('input.new-todo');

userCreateButton.addEventListener('click', async () => onUserCreateHandler());
userDeleteButton.addEventListener('click', async () => onUserDeleteHandler());
$userList.addEventListener('click', event => selectUser(event));
$todoList.addEventListener('click', event => toggleList(event));
$todoList.addEventListener('click', event => deleteList(event));
$todoList.addEventListener('dblclick', event => convertToEditing(event));
$newTodo.addEventListener('keyup', event => getEnterForAddTodo(event));
$todoList.addEventListener('keyup', event=> modifyList(event));

window.onload = () => {
  loadUserList();
}

const loadUserList = () => {
  renderLoading();
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
  currentUserButton = $userList.querySelectorAll('button.ripple')[0];
  onUserSelectHandler(currentUserButton, 0);
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

const onUserCreateHandler = async () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const MINIMUM_USER_NAME_LENGTH = 2;
  if(userName.length < MINIMUM_USER_NAME_LENGTH){
      return alert(`User의 이름은 최소 ${MINIMUM_USER_NAME_LENGTH}글자 이상이어야 합니다.`);
  }
  currentUserButton = document.querySelector('button.ripple.active');

  const newUser = userTemplate;
  newUser.name = userName;
  newUser.todoList = [];
  newUser._id = Math.random().toString(36).substr(2,10);
  users.push(newUser);
  addUser(newUser);
  
  await API.addUser(newUser);

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

const onUserDeleteHandler = async () => {
  renderLoading();

  await API.deleteUser(currentUserID);
  
  $userList.removeChild(currentUser);
  render();
}

const selectUser = event => {
  $userList.querySelectorAll('button.ripple').forEach(($user, index) => {
    if($user.contains(event.target) 
      && !$user.classList.contains('user-create-button') && !$user.classList.contains('user-delete-button')){
      onUserSelectHandler($user, index);
    }
  });
}

const toggleList = event => {
  $todoList.querySelectorAll('input.toggle').forEach(($item, index) => {
    if($item.contains(event.target)){
      toggleTodo($item, index);
    }
  })
};

const deleteList = event => {
  $todoList.querySelectorAll('button.destroy').forEach(($item, index) => {
    if($item.contains(event.target)){
      deleteTodo($item, index);
    }
  });
}

const onUserSelectHandler = async ($user, index) => {
  $userTitle.innerHTML = `<span><strong>${users[index].name}</strong>'s Todo List</span>`;
  renderLoading();
  const currentUserButton = document.querySelector('button.ripple.active');
  if(currentUserButton) currentUserButton.classList.remove('active');
  $user.classList.add('active');

  currentUser = $user;
  currentUserID = users[index]._id;

  const res = await API.fetchTodoList(currentUserID);
  todoList = await res.json();
  render();
}

const toggleTodo = async ($item, index) => {
  renderLoading();
  const todoItem = todoList[index];
  todoItem.isCompleted = !todoItem.isCompleted;
  todoList[index] = todoItem;

  await API.toggleTodo(currentUserID, todoItem._id);
  render();
}

const render = () => {
  const $todoList = document.querySelector('ul.todo-list');

  const todos = filterList();
  const renderList = todos.map(($item, index) => {
    return todoTemplate($item);
  })
  $todoList.innerHTML = renderList.join(' ');
}

const getEnterForAddTodo = event => {
  if(event.key === 'Enter'){
    addTodo($newTodo.value);
  }
}

const modifyList = event => {
  if(event.key === 'Enter'){
    $todoList.querySelectorAll('input.edit').forEach(($item, index) => {
      const itemElement = $item.closest('li');
      if(itemElement.classList.contains('editing')){
        modifyTodo($item, index);
      }
    })
  }
}

const addTodo = async todoItem => {
  renderLoading();
  const newItem = itemTemplate;
  newItem._id = Math.random().toString(36).substr(2,10);
  newItem.contents = todoItem;
  
  todoList.push(newItem);

  render();

  await API.addTodo(currentUserID, newItem);
}

const deleteTodo = async ($item, index) => {
  renderLoading();
  const todoItem = todoList[index];
  todoList.splice(index, 1);
  
  await API.deleteTodo(currentUserID, todoItem._id);
  render();
}

const modifyTodo = async ($item, index) => {
  renderLoading();
  const itemElement = $item.closest('li');
  itemElement.classList.remove('editing');
  
  const todoItem = todoList[index];
  todoItem.contents = $item.value;
  render();

  await API.updateTodo(currentUserID, todoItem);
}

const convertToEditing = event => {
  $todoList.querySelectorAll('label.label').forEach(($item, index) => {
    if($item.contains(event.target)){
      const itemElement = $item.closest('li');
      itemElement.classList.add('editing');
    }
  });
}

const filterList = () => {
  if(todoFilter === 'all') {
    return todoList;
  }
  if(todoFilter === 'active'){
    return todoList.filter(($item) => !$item.isCompleted);
  }
  if(todoFilter === 'completed'){
    return todoList.filter(($item) => $item.isCompleted);
  }
}

const renderLoading = () => {
  $todoList.innerHTML = loadingTemplate;
}

const todoTemplate = todoItem => `
        <li class=${(todoItem.isCompleted) ? "completed" : ""}>
          <div class="view">
            <input class="toggle" type="checkbox" ${(todoItem.isCompleted) ? 'checked' : ''}/>
            <label class="label">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
              ${todoItem.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${todoItem.contents} />
        </li>
`;

const loadingTemplate = `<li>
<div class="view">
  <label class="label">
    <div class="animated-background">
      <div class="skel-mask-container">
        <div class="skel-mask"></div>
      </div>
    </div>
  </label>
</div>
</li>`;