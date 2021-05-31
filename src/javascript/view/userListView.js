import { $ } from '../utils/querySelector.js';
export default class UserListView {
  constructor(users) {
    this.userList = $('#user-list');
    this.userTitle = $('#user-title strong');
    this.userCreateButton = $('.user-create-button', this.userList);
    this.selectedUser;
    users.map((user) => this.addUser(user));
  }

  getCurrentUserId() {
    return this.selectedUser ? this.selectedUser.dataset.id : '';
  }

  selectUser(userId) {
    const userNode = this._getUserNode(userId);
    if (this.selectedUser) {
      this.selectedUser.classList.remove('active');
    }
    userNode.classList.add('active');
    this.userTitle.innerText = userNode.innerText;
    this.selectedUser = userNode;
  }

  addUser(user) {
    const elem = document.createElement('button');
    elem.classList.add('ripple');
    elem.innerText = user.name;
    elem.dataset.id = user._id;
    this.userList.insertBefore(elem, this.userCreateButton);
  }

  deleteUser(userId) {
    const userNode = this._getUserNode(userId);
    if (!userNode) {
      return;
    }
    userNode.remove();
    this.selectedUser = '';
    this.userTitle.innerText = 'Choose!';
  }

  setEvents(controller) {
    this.userList.addEventListener('click', (event) => {
      const target = event.target.closest('button');
      if (!target) {
        return;
      }
      if (target.classList.contains('user-create-button')) {
        const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
        controller.addUser(userName);
      } else if (target.classList.contains('user-delete-button')) {
        if (this.selectedUser && confirm('정말로 삭제?')) {
          controller.deleteUser(this.selectedUser.dataset.id);
        } else {
          return;
        }
      } else {
        controller.selectUser(target.dataset.id);
      }
    });
  }

  _getUserNode(id) {
    return $(`[data-id="${id}"]`);
  }
}
