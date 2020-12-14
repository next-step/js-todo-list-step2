import Component from "../core/Component.js";
import $store from "../store/index.js";

import { FILTER } from "../utils/constants.js";

const TodoFilterItem = ({ href, state, text }) => {
  const isSelected = $store.filter.isSameState(state);
  const className = [state, isSelected ? "selected" : ""].join(" ");

  return `
    <li>
      <a href="${href}" class="${className}">${text}</a>
    </li>
  `;
};

export default class TodoFilter extends Component {
  async render() {
    return `
      ${Object.values(FILTER).map(TodoFilterItem).join("")}
    `;
  }
}
