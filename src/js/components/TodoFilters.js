import { SELECTOR, CLASS_NAME } from '../utils/constant.js';
import { $ } from '../utils/dom.js';

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.bindEvent();
  }

  bindEvent() {
    const container = $(SELECTOR.FILTER);
    container.addEventListener('click', ({ target }) => this.onClick(target));
  }

  onClick(target) {
    const $filters = target.closest(SELECTOR.FILTER).children;
    this.resetStatus($filters); // Filter 내부 ClassName 초기화
    const status = target.className; // 현재 target 의 className = 새로 바뀔 status
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
