let currentUser = '';
let todoList = [];
let todoComplete = [];
let todoFilter = 'all';

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

  const $newUser = document.createElement('button');
  $newUser.className = 'ripple'
  $newUser.innerText = userName;

  const userCreateButton = document.querySelector('button.user-create-button');
  userCreateButton.insertAdjacentElement('beforebegin', $newUser);
}

const userCreateButton = document.querySelector('.user-create-button');
const userList = document.querySelector('div#user-list');

userCreateButton.addEventListener('click', onUserCreateHandler);
userList.addEventListener('click', event => {
  userList.querySelectorAll('button.ripple').forEach($user => onUserSelectHandler($user, event));
})

window.onload = () => {
  const currentUserButton = document.querySelector('button.ripple.active');
  currentUser = (currentUserButton) ? currentUserButton.innerText : document.querySelector('button.ripple');
  todoList = localStorage.getItem(currentUser + '_todoList') ?? [];
  todoComplete = localStorage.getItem(currentUser + '_todoComplete') ?? [];
  render();
}

const onUserSelectHandler = ($user, event) => {
  if(!$user.contains(event.target)){
    return;
  }
  const currentUserButton = document.querySelector('button.ripple.active');
  if(currentUserButton) currentUserButton.classList.remove('active');
  $user.classList.add('active');

  currentUser = $user.innerText;
  todoList = localStorage.getItem(currentUser + '_todoList') ?? [];
  todoComplete = localStorage.getItem(currentUser + '_todoComplete') ?? [];
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