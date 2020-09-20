import {API} from './API.js';

export default function TodoUser($userTitle, $userCreateButton, $userList, userId, setActiveUser) {
  this.$userTitle = $userTitle;
  this.$userList = $userList;
  this.$userCreateButton = $userCreateButton;
  this.userName = '';
  this.userId = userId;
  this.userList = [];
  
  const onUserCreateHandler = async() => {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    await API.AddUser(userName);
    this.setState(this.userId);
  };
  
  this.setState = async (activeUserId) => {
    this.userId = activeUserId;
    this.userList = await API.GetUsers();
    this.render();
    this.bindEvents();
  };

  this.bindEvents = () => {
    document.querySelectorAll('.ripple').forEach(($item) => {
      $item.addEventListener('click', ({target}) => {
        if (target.classList.contains('user-create-button')) {
          onUserCreateHandler();
        } else {
          this.userName = target.innerText;
          this.userId = target.id;
          setActiveUser(this.userId);
        }
        this.setState(this.userId);
      });
    });
  };

  this.render = () => {
    this.$userTitle.innerHTML = `<span><strong>${this.userName}</strong>'s Todo List</span>`;
    this.$userList.innerHTML = this.userList.map(({name, _id}) => 
    `<button class="ripple ${this.userId === _id && 'active'}" id=${_id}>${name}</button>`
    ).join('') + `<button class="ripple user-create-button">+ 유저 생성</button>`;
  };

  this.setState(this.userId);
}
