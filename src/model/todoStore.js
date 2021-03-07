'use strict';

import { FILTER_TYPE } from '../constant/constants.js';

class TodoStore {
  constructor() {
    this.filterType = FILTER_TYPE.ALL;
  }

  setFilterType(filterType) {
    this.filterType = filterType;
  }
}

export const todoStore = new TodoStore();
