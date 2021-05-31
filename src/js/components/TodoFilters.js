import { getEl } from "@js/util.js";
import { FILTER_TYPE, UI_CLASS } from "@constants/constant.js";

class TodoFilters {
  constructor(store) {
    this.store = store;
    this.filtersEl = getEl("ul.filters");
    this.init();
  }

  init() {
    this.filtersEl.addEventListener("click", this.filtersHandler.bind(this));
  }

  filtersHandler({ target }) {
    if (!target.classList.contains(UI_CLASS.FILTER)) return;
    const [type] = target.classList;

    this.filtersEl.querySelectorAll(`.${UI_CLASS.FILTER}`).forEach((el) => {
      el.classList.remove(UI_CLASS.SELECTED);
      if (el.classList.contains(type)) el.classList.add(UI_CLASS.SELECTED);
    });

    this.store.set({
      filter: FILTER_TYPE[type.toUpperCase()],
    });
  }
}

export default TodoFilters;
