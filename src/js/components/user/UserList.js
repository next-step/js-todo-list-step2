import { getUserList, postUser, deleteUser } from "../../api/api.js";
import Component from "../../core/Component.js";
import { ALERT_MESSAGE, CONSTRAINTS, USER_HANDLE_TYPES } from "../../utils/constants.js";
import { confirmAlert, promtAlert } from "../../utils/utils.js";

export default class UserList extends Component {
  render() {
    const userListElement = this.store.userList.reduce((html, { _id, name }) => {
      return (html += `<button class="ripple ${this.setActiveClass(
        _id,
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
  setActiveClass(userId) {
    return this.store.selectedUserId === userId && "active";
  }

  bindEvents() {
    this.$target.addEventListener("click", (e) => this.onClickRippleButton(e));
  }

  async onClickRippleButton({ target }) {
    const action = target.dataset.action;
    const userId = target.dataset.userId;
    const userName = target.dataset.userName;

    if (userId) {
      this.store.setSelectedUser({ _id: userId, name: userName });
      this.store.notifyObservers();
      this.props.setTodoList(userId);
    }

    if (action === USER_HANDLE_TYPES.CREATE) {
      const promtUserName = promtAlert(ALERT_MESSAGE.CREATE);

      if (!promtUserName) return;
      if (promtUserName.length < CONSTRAINTS) {
        alert(ALERT_MESSAGE.LENGTH_ALERT);
        return;
      }

      const userData = await postUser({ name: promtUserName });
      const userList = await getUserList();

      this.store.setNewUserList(userList);
      this.store.setSelectedUser(userData);
      this.store.notifyObservers();
    }

    if (action === USER_HANDLE_TYPES.DELETE) {
      const confirmChecked = confirmAlert(ALERT_MESSAGE.DELETE(this.store.selectedUserName));
      confirmChecked && (await deleteUser(this.store.selectedUserId));
      const userList = await getUserList();

      this.store.setNewUserList(userList);
      this.store.setSelectedUser();
      this.store.notifyObservers();
    }
  }
}
