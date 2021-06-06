import { FILTER } from '../constants/constants.js';
import Subject from '../core/Subject.js';

class FilterState extends Subject {
  constructor() {
    super();
    this._filter = FILTER.ALL;
  }

  get() {
    return this._filter;
  }

  set(updateFilter) {
    this._filter = updateFilter;
    this.publish();
  }
}

export default new FilterState();
