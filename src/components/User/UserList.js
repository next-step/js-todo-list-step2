import {Component} from "../../core/Component.js";
import {userStore} from "../../store/userStore.js";

export const UserList = class extends Component {

  template () {
    const { users, selectedIndex } = userStore.$state;
    return `
      ${users.map(({ name }, index) => `
        <button
          data-ref="select"
          data-index="${index}"
          class="ripple ${index === selectedIndex ? 'active' : ''}">
          ${name}
        </button>
      `).join('')}
      <button data-ref="appender" class="ripple user-create-button">+ 유저 생성</button>
      <button data-ref="remover" class="ripple user-create-button">- 선택 삭제</button>
    `;
  }

  setEvent () {
    this.addEvent('click', 'select', ({ index }) => {
      this.$props.loadItemsByUser(index);
    })
    this.addEvent('click', 'appender', () => {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      this.$props.appendUser(userName);
    })
    this.addEvent('click', 'remover', () => this.$props.removeUser());

  }
}
