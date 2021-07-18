import Component from "../../core/Component.js";
import { FILTER_TYPES } from "../../utils/constants.js";
import { checkClassList } from "../../utils/utils.js";

export default class TodoFilter extends Component {
  bindEvents() {
    this.$target.addEventListener("click", (e) => this.onClickFilterBtn(e));
  }

  onClickFilterBtn({ target }) {
    checkClassList(target, FILTER_TYPES.ALL) && this.setTodoStatus(FILTER_TYPES.ALL);

    checkClassList(target, FILTER_TYPES.ACTIVE) && this.setTodoStatus(FILTER_TYPES.ACTIVE);

    checkClassList(target, FILTER_TYPES.COMPLETED) && this.setTodoStatus(FILTER_TYPES.COMPLETED);

    this.store.notifyObservers();
  }

  setTodoStatus(status) {
    this.store.setTodoStatus(status);
  }
}
