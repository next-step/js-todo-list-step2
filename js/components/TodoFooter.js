// core
import DOM from '../core/createElement.js';
import eventChannel from '../core/eventChannel.js';
const { done } = eventChannel;

// child components
import FilterItem from './FilterItem.js';

// constants
import { ACTIONS, FILTER_LIST, MESSAGES } from '../constants/index.js';
const { VIEW } = ACTIONS;

// class component
export default class TodoFooter {
  constructor() {
    this.$counterContainer = DOM.div({
      class: 'count-container',
      onclick: onFooterClickHandler,
    });

    this.render();
  }

  get $el() {
    return this.$counterContainer;
  }

  setState(props) {
    this.render(props);
  }

  render({ todoCount = 0, currentFilter = 'all' } = {}) {
    this.$counterContainer.innerHTML = `
      <span class="todo-count">총 <strong>${todoCount}</strong> 개</span>
        <ul class="filters">
          ${FILTER_LIST.map(
            (filter) =>
              FilterItem({ filter, isSelected: filter === currentFilter })
                .outerHTML
          ).join('')}
        </ul>
      <button class="clear-completed">모두 삭제</button>
    `;
  }
}

// event handlers
const onFooterClickHandler = ({ target }) => {
  const { className } = target;

  if (className === 'clear-completed') {
    confirm(MESSAGES.DELETE_ALL_TODOS) && done(VIEW.DELETE_ALL_TODOS);
    return;
  }

  if (FILTER_LIST.includes(className)) {
    done(VIEW.CHANGE_FILTER, { currentFilter: className });
    return;
  }
};
