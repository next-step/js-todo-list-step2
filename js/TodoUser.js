import {ADDRESS} from './constants.js';
import {API} from './API.js';

export default function TodoUser($userTitle, $userCreateButton, $userList, userId, setActiveUser) {
  this.$userTitle = $userTitle;
  this.$userList = $userList;
  this.$userCreateButton = $userCreateButton;
  this.userName = '';
  this.userId = userId;
  this.userList = [];

  this.getUsers = async () => {
    const response = await fetch(`${ADDRESS.BASE_URL}/api/u`, API.GET);
    this.userList = await response.json();
    this.render();
    this.bindEvents();
  };

  const onUserCreateHandler = () => {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
  };

  this.setState = (activeUserId) => {
    this.userId = activeUserId;
    this.getUsers();
    setActiveUser(this.userId);
  };

  this.bindEvents = () => {
    document.querySelectorAll('.ripple').forEach(($item) => {
      $item.addEventListener('click', ({target}) => {
        if (target.classList.contains('user-create-button')) {
          onUserCreateHandler();
        } else {
          this.userName = target.innerText;
          this.userId = target.id;
          this.setState(this.userId);
        }
      });
    });
  };

  this.render = () => {
    this.$userTitle.innerHTML = `<span><strong>${this.userId}</strong>'s Todo List</span>`;
    let result = '';
    this.userList.map(({name, _id}) => {
      result += `<button class="ripple ${this.userId === name && 'active'}" id=${_id}>${name}</button>`;
    }).join('');
    this.$userList.innerHTML = result + `<button class="ripple user-create-button">+ 유저 생성</button>`;
  };

  this.getUsers();
}
