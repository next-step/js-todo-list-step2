import { FILTER } from '../constants/constants.js';

class FilterState {
  constructor() {
    this._filter = FILTER.ALL;
    this.observers = [];
  }

  get() {
    return this._filter;
  }

  set(updateFilter) {
    this._filter = updateFilter;
    this.publish();
  }

  subscribe(observer) {
    this.observers = this.observers.concat(observer);
  }

  publish() {
    this.observers.forEach((cb) => cb());
  }
}

export default new FilterState();
