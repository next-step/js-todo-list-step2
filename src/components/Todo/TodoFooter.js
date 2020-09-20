import { Component } from "../../core/Component.js";
import FilterTypes from "../../constants/FilterTypes.js";

const filterButtons = [
  { type: FilterTypes.ALL, text: '전체보기' },
  { type: FilterTypes.ACTIVE, text: '해야할 일' },
  { type: FilterTypes.COMPLETED, text: '완료한 일' },
];

export const TodoFooter = class extends Component {

  template () {
    const { itemCount, filterType } = this.$props;
    return `
      <span class="todo-count">총 <strong>${itemCount}</strong> 개</span>
      <ul class="filters">
        ${filterButtons.map(({ type, text }) => `
          <li>
            <a href="#"
               class="${type} ${type === filterType ? 'selected' : ''}"
               data-filter-type="${type}"
               data-ref="filter">
              ${text}
            </a>
          </li>
        `).join('')}
      </ul>
      <button data-ref="clear" class="clear-completed">모두 삭제</button>
    `;
  }

  setEvent () {
    const { filterItem, removeAll } = this.$props;
    this.addEvent('click', 'filter', ({ target }) => filterItem(target.dataset.filterType));
    this.addEvent('click', 'clear', () => removeAll());
  }
}
