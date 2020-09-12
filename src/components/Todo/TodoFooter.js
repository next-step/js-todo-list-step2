import { Component } from "../../core/Component.js";
import FilterTypes from "../../constants/FilterTypes.js";
import { REMOVE_ALL_ITEM, SET_FILTER_TYPE, todoStore } from "../../store/todoStore.js";
import { userStore } from "../../store/userStore.js";

const filterButtons = [
  { type: FilterTypes.ALL, text: '전체보기' },
  { type: FilterTypes.ACTIVE, text: '해야할 일' },
  { type: FilterTypes.COMPLETED, text: '완료한 일' },
];

export const TodoFooter = class extends Component {

  componentInit () {
    this.$stores = [ todoStore ];
  }

  get #itemCount () { return todoStore.$getters.filteredItems.length; }
  get #filterType () { return todoStore.$state.filterType; }
  get #user () { return userStore.$getters.selectedUser?._id; }

  template () {
    return `
      <span class="todo-count">총 <strong>${this.#itemCount}</strong> 개</span>
      <ul class="filters">
        ${filterButtons.map(({ type, text }) => `
          <li>
            <a href="#"
               class="${type} ${type === this.#filterType ? 'selected' : ''}"
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
    this.addEvent('click', 'filter', ({ target }) => {
      todoStore.commit(SET_FILTER_TYPE, target.dataset.filterType);
    });
    this.addEvent('click', 'clear', () => {
      todoStore.dispatch(REMOVE_ALL_ITEM, this.#user);
    });
  }
}