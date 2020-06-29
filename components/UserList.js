import { userItemTemplate } from '../template.js';

function UserList({ selectUser }) {
  this.userList = [];
  const $userList = document.querySelector('#user-list');

  this.setState = (updatedUserList) => {
    this.userList = updatedUserList;
    this.render(this.userList);
  };

  this.render = (items) => {
    const template = items.map(userItemTemplate);
    $userList.innerHTML = template.join('');
  };

  $userList.addEventListener('click', (event) => this.selectUser(event));

  this.selectUser = (event) => {
    const $clickedItem = event.target;
    if ($clickedItem.tagName === 'BUTTON') {
      Array.from($userList.getElementsByTagName('button')).forEach((el) =>
        el.classList.remove('active')
      );
      $clickedItem.classList.add('active');
      selectUser($clickedItem.innerHTML);
    }
  };
}

export default UserList;
