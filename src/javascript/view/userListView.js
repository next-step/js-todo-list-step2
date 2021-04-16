import { $ } from '../utils/querySelector.js';
export default class UserListView {
  constructor(users) {
    this.userList = $('#user-list');
    this.userCreateButton = $('.user-create-button', this.userList);
    this.cuserDeleteButton = $('.user-delete-button', this.userList);
    this.selectedUser;
    users.map((user) => this.addUser(user));
  }

  addUser(user) {
    const elem = document.createElement('button');
    elem.classList.add('ripple');
    elem.innerText = user.name;
    elem.dataset.id = user.id;
    this.userList.insertBefore(elem, this.userCreateButton);
  }

  setSelectUser(callback) {
    this.userList.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (
        !target ||
        target.classList.contains('user-create-button') ||
        target.classList.contains('user-delete-button')
      )
        return;
      // NOTE: 현재 인자로 DOM 요소 자체를 넘기고 있다. 이렇게 하는게 좋은 방식인가?
      // NOTE: 아니면 좋지 않은 방식인가... 이에 대한거는 생각이 필요할거 같다.
      callback(target);
    });
  }

  setActive(data) {
    if (this.selectedUser) {
      this.selectedUser.classList.remove('active');
    }
    data.classList.add('active');
    this.selectedUser = data;
  }
}
