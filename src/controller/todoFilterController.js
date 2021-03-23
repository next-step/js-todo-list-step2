'use strict';

import { $ } from '../utils/dom.js';
import { API } from '../api/api.js';
import { todoStore } from '../model/todoStore.js';
import { userStore } from '../model/userStore.js';
import { todoFitlerView } from '../view/todoFilterView.js';
import { FILTER_TYPE } from '../constant/constants.js';
import { ElementValidator } from '../validator/validator.js';
import { DELETE_ALL_ITEM_MESSAGE } from '../constant/message.js';
import { todoListController } from './todoListController.js';

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
      this.changeFilterBtn(filterType);
    } else if (ElementValidator.isClearBtn(target)) {
      this.clearAllItems();
    }
  };

  changeFilterBtn(filterType) {
    todoStore.setFilterType(filterType);
    todoFitlerView.changeSelectedBtn(filterType);
    todoListController.loadUserItems(userStore.currentUserID);
  }

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

  async clearAllItems() {
    if (!confirm(DELETE_ALL_ITEM_MESSAGE)) return;
    await API.deleteAllTodoItem(userStore.currentUserID);
    todoListController.loadUserItems(userStore.currentUserID);
  }

  init() {}
}

export const todoFilterController = new TodoFilterController();
