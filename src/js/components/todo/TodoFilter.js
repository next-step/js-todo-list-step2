import Component from "../../core/Component.js";
import { FILTER_TYPES } from "../../utils/constants.js";
import { $$, checkClassList } from "../../utils/utils.js";

export default class TodoFilter extends Component {
  render() {
    this.$target.innerHTML = `
      <li>
        <a href="#" class="all ${this.setSelected(FILTER_TYPES.ALL)}">전체보기</a>
      </li>
      <li>
        <a href="#active" class="active ${this.setSelected(FILTER_TYPES.ACTIVE)}">해야할 일</a>
      </li>
      <li>
        <a href="#completed" class="completed ${this.setSelected(FILTER_TYPES.COMPLETED)}">완료한 일</a>
      </li>
    `;
  }

  bindEvents() {
    this.$target.addEventListener("click", (e) => this.onClickFilterBtn(e));
  }

  onClickFilterBtn({ target }) {
    checkClassList(target, FILTER_TYPES.ALL) && this.setTodoStatus(FILTER_TYPES.ALL);

    checkClassList(target, FILTER_TYPES.ACTIVE) && this.setTodoStatus(FILTER_TYPES.ACTIVE);

    checkClassList(target, FILTER_TYPES.COMPLETED) && this.setTodoStatus(FILTER_TYPES.COMPLETED);

    // this.setSelected(target);
    this.store.notifyObservers();
  }

  setTodoStatus(status) {
    this.store.setTodoStatus(status);
  }

  setSelected(type) {
    return type === this.store.todoStatus ? "selected" : "";
  }
}
