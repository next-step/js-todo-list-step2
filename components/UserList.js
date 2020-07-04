import { userItemTemplate, userTitleTemplate } from '../template.js';

function UserList({ selectUser }) {
  this.userList = [];
  const $userList = document.querySelector('#user-list');
  const $userTitle = document.querySelector('#user-title');

  this.setState = (updatedUserList) => {
    this.userList = updatedUserList;
    this.render(this.userList);
  };

  this.render = (items) => {
    const template = items.map(userItemTemplate);
    $userList.innerHTML = template.join('');
  };

  $userList.addEventListener('click', (event) => this.onClickUser(event));

  this.selectUser = (id) => {
    Array.from($userList.getElementsByTagName('button')).forEach((el) =>
      el.classList.remove('active')
    );
    const $selectItem = document.getElementById(id);
    $selectItem.classList.add('active');
    const name = $selectItem.innerHTML;
    $userTitle.innerHTML = userTitleTemplate(name);
    selectUser(name);
  };

  this.onClickUser = (event) => {
    const $clickedItem = event.target;
    if ($clickedItem.tagName === 'BUTTON') {
      this.selectUser($clickedItem.id);
    }
  };
}

export default UserList;
