import Component from "../core/Component.js";
import $store from "../store/index.js";

import { FILTER } from "../utils/constants.js";

const TodoFilterItem = ({ href, state, text }) => {
  const isSelected = $store.filter.isSameState(state);

  return `
    <li>
      <a 
        href="${href}" 
        class="${isSelected ? "selected" : ""}"
        data-state="${state}"
        data-action="selectFilter"
      >
        ${text}
      </a>
    </li>
  `;
};

export default class TodoFilter extends Component {
  init() {
    this.events = {
      click: [this.selectFilter],
    };

    $store.filter.subscribe(this.setState.bind(this));
  }

  selectFilter({ target }) {
    const selected = Object.values(FILTER).find(
      ({ state }) => state === target.dataset.state
    );
    $store.filter.setFilter(selected);
  }

  async render() {
    return `
      <ul id="todo-filter" class="filters">
        ${Object.values(FILTER).map(TodoFilterItem).join("")}
      </ul>
    `;
  }
}
