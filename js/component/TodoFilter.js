import Component, { props } from "../core/Component.js";
import $store from "../store/index.js";

import TodoFilterItem from "./TodoFilterItem.js";
import { FILTER } from "../utils/constants.js";

export default class TodoFilter extends Component {
  init() {
    this.components = {
      "todo-filter-item": TodoFilterItem,
    };

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

  todoFilterItem(filter) {
    return `
      <todo-filter-item 
        key="${filter.href}" 
        ${props(filter)}
      >
      </todo-filter-item>`;
  }

  async render() {
    const todoFilterItems = Object.values(FILTER)
      .map(this.todoFilterItem)
      .join("");

    return `
      <ul id="todo-filter" class="filters">
        ${todoFilterItems}
      </ul>
    `;
  }
}
