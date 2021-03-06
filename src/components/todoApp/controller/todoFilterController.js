'use strict';

import { todoListStore } from '../store/store.js';
import { todoFitlerView } from '../view/todoFilterView.js';
import { todoListView } from '../view/todoListView.js';
import { $ } from '../../../utils/dom.js';
import { FILTER_TYPE } from '../../../constant/constants.js';
import { ElementValidator } from '../../../validator/validator.js';
import { DELETE_ALL_ITEM_MESSAGE } from '../../../constant/message.js';

class TodoFilterController {
  constructor() {
    this.$filter = $('.count-container');
    this.$filter.addEventListener('click', this.onClickFilter);
  }

  onClickFilter = ({ target }) => {
    if (
      ElementValidator.isNotFilterBtn(target) &&
      ElementValidator.isNotClearBtn(target)
    )
      return;
    if (ElementValidator.isFilterBtn(target)) {
      const filterType = this.getSelctedFilterType(target);
      todoListStore.setFilterType(filterType);
      todoListView.render(todoListStore.getItemsByFilter());
      todoFitlerView.changeSelectedBtn(target);
    } else if (ElementValidator.isClearBtn(target)) {
      this.clearAllItems();
    }
  };

  getSelctedFilterType(target) {
    const classList = target.classList;
    if (classList.contains(FILTER_TYPE.ALL)) {
      return FILTER_TYPE.ALL;
    } else if (classList.contains(FILTER_TYPE.ACTIVE)) {
      return FILTER_TYPE.ACTIVE;
    } else if (classList.contains(FILTER_TYPE.COMPLETED)) {
      return FILTER_TYPE.COMPLETED;
    }
  }

  clearAllItems() {
    if (!confirm(DELETE_ALL_ITEM_MESSAGE)) return;
    todoListStore.clear();
    todoListView.clear();
  }
}

export default TodoFilterController;
