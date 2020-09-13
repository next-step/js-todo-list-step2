import { Observer } from '../observer/Observer.js';
import templates from '../data/templates.js';

export const UserList = class extends Observer {
  setEvent() {
    this._target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('user-create-button')) {
        const userName = new String(prompt('추가하고 싶은 이름을 입력해주세요.'));
        if (userName && userName !== ''&& 1 < userName.length) {
          this._service.addUser(userName);
        }
      }
    });
    this._target.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('user-create-button')) {
        let selectedIdx = target.dataset['idx'];
        this._service.changeSelectedUserById(selectedIdx);
      }
    });
  }

  setState() {
    super.setState({
      userList: this._service.getUserList(),
      selectedUser: this._service.getSelectedUser(),
    });
  }

  render() {
    const { userList, selectedUser } = this._state;
    if (userList.length && userList.length > 0) {
      let tag = userList
        .map((user) => templates.userBtn(user, user === selectedUser))
        .join('');
      tag += templates.userCreateBtn();
      this._target.innerHTML = tag;
    }
  }
};
