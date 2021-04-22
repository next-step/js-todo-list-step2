import { $, $All } from './common.js';
import { getFetchItems } from './api.js';
import { UserProduce } from '../components/user/UserProduce.js';

export const userItems = [];

export const handleSelectedState = (state) => {
  const stateList = {
    all: todoItems,
    active: todoItems.filter(todo => !todo.done),
    completed: todoItems.filter(todo => todo.done)
  };

  return { 
    stateList: stateList[state], 
    count: stateList[state].length 
  };
}

export const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const user = new UserProduce();
  user.setState(userName);
  getFetchItems('users', 'POST', { name: userName });
}

export const onUserDeleteHandler = (e) => {
  console.log(e);
}

export const onUserSelected = (e) => {
  const userTitle = $('#user-title');
  const users = $All('.ripple');

  if (!e.target.classList.contains('ripple') || e.target.dataset.action) return;

  Array.from(users).map(user => user.classList.remove('active'));
  e.target.classList.add('active');
  userTitle.querySelector('strong').innerText = e.target.innerText;
}