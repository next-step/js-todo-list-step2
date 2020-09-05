import { Component } from "../core/Component.js";
import FilterTypes from "../constants/FilterTypes.js";
import LoadingTypes from "../constants/LoadingTypes.js";
import { REMOVE_ALL_ITEM, SET_LOADING_TYPE, todoStore } from "../store/todoStore.js";
import { userStore } from "../store/userStore.js";
import { lazyFrame } from "../utils/index.js";

const filterButtons = [
  { type: FilterTypes.ALL, text: '전체보기' },
  { type: FilterTypes.ACTIVE, text: '해야할 일' },
  { type: FilterTypes.COMPLETED, text: '완료한 일' },
];

export const TodoFooter = class extends Component {

  get #itemCount () {
    const { todoItems, filterType } = todoStore.$state;
    return todoItems.filter(({ isCompleted }) =>
      FilterTypes.ALL ||
      (isCompleted && filterType === FilterTypes.COMPLETED) ||
      (!isCompleted && filterType === FilterTypes.ACTIVE)
    ).length;
  }

  get #filterType () {
    return todoStore.$state.filterType;
  }

  get #user () {
    return userStore.$getters.selectedUser.name;
  }

  render () {
    return `
      <span class="todo-count">총 <strong>${this.#itemCount}</strong> 개</span>
      <ul class="filters">
        ${filterButtons.map(({ type, text }) => `
          <li>
            <a href="#"
              class="filter-button ${type} ${type === this.#filterType ? 'selected' : ''}"
              data-filter-type="${type}"
            >
              ${text}
            </a>
          </li>
        `).join('')}
      </ul>
      <button class="clear-completed">모두 삭제</button>
    `;
  }

  setEvent (componentTarget) {
    componentTarget.addEventListener('click', ({ target }) => {
      const contain = className => target.classList.contains(className);
      if (contain('clear-completed'))
        this.#removeAllItem();
      if (contain('filter-button'))
        this.#selectFilter(target.dataset.filterType);
    })
  }

  async #removeAllItem () {
    todoStore.commit(SET_LOADING_TYPE, LoadingTypes.INIT);
    await Promise.all([
      todoStore.dispatch(REMOVE_ALL_ITEM, this.#user),
      lazyFrame()
    ]);
    todoStore.commit(SET_LOADING_TYPE, LoadingTypes.LOADED);
  }
}