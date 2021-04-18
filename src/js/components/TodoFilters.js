import { SELECTOR, CLASS_NAME } from '../utils/constant.js';
import { $ } from '../utils/dom.js';

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.bindEvent();
  }

  bindEvent() {
    const container = $(SELECTOR.FILTER);
    container.addEventListener('click', (e) => this.onClick(e));
  }

  onClick({ target }) {
    const $filters = target.closest(SELECTOR.FILTER).children;
    this.resetStatus($filters);
    const status = target.className;
    target.classList.add(CLASS_NAME.SELECTED);
    this.store.setStatus(status);
  }

  resetStatus(filters) {
    Array.from(filters).map((filter) => {
      const $anchor = filter.children[0];
      $anchor.classList.remove(CLASS_NAME.SELECTED);
    });
  }
}

export default TodoFilters;
