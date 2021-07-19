import { postTodo } from "../../api/api.js";
import Component from "../../core/Component.js";
import { ALERT_MESSAGE, CONSTRAINTS, KEY_NAME } from "../../utils/constants.js";

export default class TodoInput extends Component {
  bindEvents() {
    this.$target.addEventListener("keypress", (e) => this.onKeyupEnter(e));
  }

  async onKeyupEnter({ key }) {
    const contents = this.$target.value;

    if (key !== KEY_NAME.ENTER) return;
    if (!contents.trim()) return;
    if (contents.length < CONSTRAINTS) {
      alert(ALERT_MESSAGE.LENGTH_ALERT);
      return;
    }

    const todoInfo = await postTodo({ contents }, this.props.userStore.selectedUserId);
    this.store.addTodo(todoInfo);
    this.store.notifyObservers();
    this.$target.value = "";
  }
}
