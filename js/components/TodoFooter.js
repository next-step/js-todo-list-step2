import DOM from '../core/createElement.js';
import FilterItem from './FilterItem.js';
import { FILTER } from '../constants/index.js';
import { onFooterClickHandler } from '../actions/index.js';

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
          ${Object.values(FILTER)
            .map(
              (filter) =>
                new FilterItem({ filter, isSelected: filter === currentFilter }).$el
                  .outerHTML
            )
            .join('')}
        </ul>
      <button class="clear-completed">모두 삭제</button>
    `;
  }
}
