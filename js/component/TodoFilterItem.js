import Component from "../core/Component.js";
import $store from "../store/index.js";

export default class TodoFilterItem extends Component {
  render() {
    const { href, state, text } = this.props;
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
  }
}
