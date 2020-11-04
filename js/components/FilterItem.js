// core
import DOM from '../core/createElement.js';

// constants
import { FILTER, GET_FILTER_TEXT } from '../constants/index.js';

const FilterItem = (filter, isSelected) =>
  DOM.li(
    null,
    DOM.a({
      href: filter === FILTER.ALL ? '/#' : '#' + filter,
      class: isSelected ? `${filter} selected` : filter,
      innerText: GET_FILTER_TEXT(filter),
    })
  );

export default FilterItem;
