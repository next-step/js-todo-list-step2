import { FILTER } from '../constants/constants.js';

class FilterState {
  constructor() {
    this._filter = FILTER.ALL;
  }

  get() {
    return this._filter;
  }

  set(updateFilter) {
    this._filter = updateFilter;
  }
}

export default new FilterState();
