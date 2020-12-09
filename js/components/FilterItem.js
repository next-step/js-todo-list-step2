// core
import DOM from '../core/createElement.js';

// constants
import { FILTER, FILTER_TEXT } from '../constants/index.js';

// function component
const FilterItem = ({ filter, isSelected }) =>
  DOM.li(
    null,
    DOM.a({
      href: filter === FILTER.ALL ? '/#' : '#' + filter,
      class: isSelected ? `${filter} selected` : filter,
      innerText: FILTER_TEXT[filter],
    })
  );

export default FilterItem;
