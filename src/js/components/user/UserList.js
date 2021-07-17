import Component from "../../core/Component.js";
import { USER_HANDLE_TYPES } from "../../utils/constants.js";

export default class UserList extends Component {
  render() {
    const userListElement = this.store.userList.reduce((html, { _id, name }) => {
      return (html += `<button class="ripple ${this.setActiveClass(
        name,
      )}" data-user-id=${_id} data-user-name=${name}>${name}</button>`);
    }, "");

    this.$target.innerHTML = userListElement;
    this.$target.innerHTML += `
      <button class="ripple user-create-button" data-action="createUser">
        + 유저 생성
      </button>
      <button class="ripple user-delete-button" data-action="deleteUser">
        삭제 -
      </button>
    `;
  }

  /**
   * @param {string} userName
   */
  setActiveClass(userName) {
    return this.store.selectedUser === userName && "active";
  }

  bindEvents() {
    this.$target.addEventListener("click", (e) => this.onClickRippleButton(e));
  }

  onClickRippleButton({ target }) {
    const action = target.dataset.action;
    const userId = target.dataset.userId;
    const userName = target.dataset.userName;

    if (userId) {
      this.store.setSelectedUser(userName);
      this.store.notifyObservers();
      // this.props.setTodoStore(userId);
    }

    if (action === USER_HANDLE_TYPES.CREATE) {
      console.log(1);
    }
  }
}
