import DOM from '../core/createElement.js';
import { FILTER, GET_FILTER_TEXT } from '../constants/index.js';

export default class FilterItem {
  constructor({ filter, isSelected }) {
    this.$filterItem = DOM.li();
    this.$filterAnchor = DOM.a({
      href: filter === FILTER.ALL ? '/#' : '#' + filter,
      class: isSelected ? `${filter} selected` : `${filter}`,
      innerText: GET_FILTER_TEXT(filter),
    });

    this.render();
  }

  get $el() {
    return this.$filterItem;
  }

  render() {
    this.$filterItem.appendChild(this.$filterAnchor);
  }
}
