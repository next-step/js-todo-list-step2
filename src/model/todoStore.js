'use strict';

import { API } from '../api/api.js';
import { FILTER_TYPE } from '../constant/constants.js';

class TodoStore {
  constructor() {
    this.filterType = FILTER_TYPE.ALL;
  }

  async loadItems(userID) {
    const items = await API.getUserTodoItems(userID);
    this.todoItems = items;
  }

  setFilterType(filterType) {
    this.filterType = filterType;
  }
}

export const todoStore = new TodoStore();
