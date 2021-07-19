import { deleteAllTodo } from "../../api/api.js";
import Component from "../../core/Component.js";
import { ALERT_MESSAGE } from "../../utils/constants.js";
import { confirmAlert } from "../../utils/utils.js";

export default class TodoClearButton extends Component {
  bindEvents() {
    this.$target.addEventListener("click", (e) => this.onClickClearBtn(e));
  }

  onClickClearBtn() {
    const check = confirmAlert(ALERT_MESSAGE.DELETE_ALL);
    if (!check) return;
    deleteAllTodo(this.props.userStore.selectedUserId);
    this.store.clearTodo();
    this.store.notifyObservers();
  }
}
