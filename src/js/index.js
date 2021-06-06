const $userList = document.querySelector('#user-list');
const $userName = document.querySelector('#user-title strong');

const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

let users = [];
let activeUser = { _id: '', name: '' };

function getUserTemplate({ _id, name }) {
  return `<button class="ripple ${_id === activeUser._id && 'active'}" id=${_id}>${name}</button>`;
}

const userControlButtonTemplate = `
  <button class="ripple user-create-button">
    + 유저 생성
  </button>
  <button class="ripple user-delete-button">
    삭제 -
  </button>
`;

async function getUsers() {
  const response = await fetch(API_URL);
  return response.json();
}

function render() {
  const usersTemplate = users.map(getUserTemplate);
  $userList.innerHTML = usersTemplate.join('') + userControlButtonTemplate;
  $userName.innerText = activeUser.name;
}

async function loadUsers() {
  users = await getUsers();
  activeUser = users[0];
  render();
}

function selectUser(event) {
  const userTarget = event.target;
  if (!userTarget.classList.contains('ripple') || userTarget.id === '') return;
  activeUser = { _id: userTarget.id, name: userTarget.innerText };
  render();
}

function main() {
  loadUsers();

  $userList.addEventListener('click', selectUser);
}

main();
