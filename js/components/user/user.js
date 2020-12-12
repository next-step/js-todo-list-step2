import Component from '../../lib/component.js';
import store from '../../store/index.js';
import { validateInput } from '../../common/validate.js';

const User = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('#user-list'),
    });
  }

  //버튼 핸들
  onUserClick = (e) => {
    switch (e.target.getAttribute('data-ref')) {
      case 'appender':
        const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
        if (!validateInput(userName)) return;
        store.dispatch('addUser', { name: userName });
        break;
      case 'remover':
        store.dispatch('deleteUser', store.state.selectedUser);
        break;
      case 'select':
        store.dispatch('setSelectedUser', e.target.id);
        store.dispatch('setSelectedUserName', e.target.value);
        break;
    }
  };

  render() {
    if (!store.state.userList) return;
    this.element.innerHTML = `
        ${store.state.userList
          .map(
            (user, i) => `
          <button
            id="${user._id}"
            data-ref="select"
            data-index=""
            class="ripple
            ${store.state.selectedUser === '' && i === 0 ? 'active' : ''}
            ${store.state.selectedUser === user._id ? 'active' : ''}
            " value = ${user.name}>
            ${user.name}
          </button>
        `
          )
          .join('')}
        <button data-ref="appender" class="ripple user-create-button">+ 유저 생성</button>
        <button data-ref="remover" class="ripple user-create-button">- 선택 삭제</button>
      `;
  }

  setEvent(target) {
    target.addEventListener('click', (e) => {
      this.onUserClick(e);
    });
  }
};

export default User;
