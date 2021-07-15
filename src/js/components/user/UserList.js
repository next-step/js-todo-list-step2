import Component from "../../core/Component.js";
import { USER_HANDLE_TYPES } from "../../utils/constants.js";

export default class UserList extends Component {
  render() {
    const userListElement = this.store.userList.reduce((html, { _id, name }) => {
      return (html += `<button class="ripple" data-user-id="${_id}">${name}</button>`);
    }, "");

    this.$target.insertAdjacentHTML("afterbegin", userListElement);
  }
}
