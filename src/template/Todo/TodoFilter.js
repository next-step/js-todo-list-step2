import * as CONST from '../../constants/index.js';
import { createDOM } from '../../utils.js';

const TodoFilter = ({ getFilter, setFilter }) => {
  const dom = createDOM(
    'ul',
    {
      className: 'filters',
    },
  );

  dom.addEventListener(
    'click',
    ({ target: { dataset } }) => (
      setFilter(dataset.filter)
    ),
  );

  const selection = (filter, key) => (
    filter === key ? 'selected' : ''
  );

  const render = () => {
    const filter = getFilter(render);
    dom.innerHTML = Object.entries(CONST.filter)
      .map(([key, value]) => (
        `<li>
          <a href="#" 
          class="${key} ${selection(filter, key)}" 
          data-filter="${key}">
            ${value}
          </a>
        </li>`
      )).join('');
  };

  render();
  return dom;
};

export default TodoFilter;