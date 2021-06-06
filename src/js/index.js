const $userList = document.querySelector('#user-list');
const $username = document.querySelector('#user-title strong');

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

async function getUsersData() {
  const response = await fetch(API_URL);
  return response.json();
}

async function addUserData(username) {
  const data = { name: username };
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function render() {
  const usersTemplate = users.map(getUserTemplate);
  $userList.innerHTML = usersTemplate.join('') + userControlButtonTemplate;
  $username.innerText = activeUser.name;
}

async function loadUsers() {
  users = await getUsersData();
}

async function initUsers() {
  await loadUsers();
  activeUser = users[0];
  render();
}

function selectUser(event) {
  const userTarget = event.target;
  if (!userTarget.classList.contains('ripple') || userTarget.id === '') return;
  activeUser = { _id: userTarget.id, name: userTarget.innerText };
  render();
}

async function addUser(event) {
  const addUserButtonTarget = event.target;
  if (!addUserButtonTarget.classList.contains('user-create-button')) return;
  const username = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (username.length < 2) {
    window.alert('2글자 이상이어야 합니다.');
    return;
  }
  await addUserData(username);
  await loadUsers();
  render();
}

function main() {
  initUsers();

  $userList.addEventListener('click', selectUser);
  $userList.addEventListener('click', addUser);
}

main();
