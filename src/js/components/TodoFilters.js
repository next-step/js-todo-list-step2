import { SELECTOR, CLASS_NAME, NODE_NAME } from '../utils/constant.js';
import { $, $all } from '../utils/dom.js';

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.container = $(SELECTOR.FILTER);
    this.bindEvent();
  }

  bindEvent() {
    this.container.addEventListener('click', (e) => this.onClick(e));
  }

  onClick({ target }) {
    const $filters = $all(NODE_NAME.LIST, this.container);
    this.resetStatus($filters);
    const status = target.className;
    target.classList.add(CLASS_NAME.SELECTED);
    this.store.setStatus(status);
  }

  resetStatus($filters) {
    Array.from($filters).map((filter) => {
      const $anchor = $(NODE_NAME.ANCHOR, filter);
      $anchor.classList.remove(CLASS_NAME.SELECTED);
    });
  }
}

export default TodoFilters;
