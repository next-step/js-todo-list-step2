import API from '../api/index.js';
import Todos from '../components/Todos/index.js';
import Users from '../components/Users/index.js';
import UserList from '../components/Users/UserList.js';
import { $, $All } from './common.js';

export const onUserHandler = (e) => {
  if (!e.target.matches('button')) return;

  (e.target.matches('.user-create-button')) && onUserCreateHandler();
  (e.target.matches('.user-delete-button')) && onUserDeleteHandler();
  (e.target.dataset._id) && onUserTodos(e);
}

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

  if (!userName) return;
  if (userName.length < 2) {
    alert('이름은 최소 2글자 이상이어야 합니다.');
    return;
  }

  const user = addUser(userName);

  return user;
}

async function addUser(userName) {
  const createUser = await API.addUser(userName);
  const userTemplate = `<button class="ripple" data-_id="${createUser._id}">${createUser.name}</button>`;

  $('#user-list').insertAdjacentHTML('afterbegin', userTemplate);
  rippleActiveHandler($('#user-list').firstChild);

  return userTemplate;
}

const onUserDeleteHandler = () => {
  const userName = confirm("정말 삭제하시겠습니까?");

  if (!userName) return;

  const userList = $All('[data-_id]');
  const user = Array.from(userList).find(user => user.className.includes('active'));
  const userId = user.dataset._id;
  API.deleteUser(userId);
  user.remove();
}

const onUserTodos = (e) => {
  rippleActiveHandler(e.target);

  const userTodoList = API.getUserTodoList(e.target.dataset._id);
  Todos(userTodoList);
}

export function rippleActiveHandler(ripple) {
  const $ripples = $All('.ripple');
  const $userTitle = $('#user-title');

  Array.from($ripples).map(ripple => ripple.classList.remove('active'));
  ripple.classList.add('active');
  $userTitle.querySelector('strong').innerText = ripple.innerText;
}