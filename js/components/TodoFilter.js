import { COMPLETED, ALL, ACTIVE, SELECTED } from '../constant/index.js';
import Component from '../core/Component.js';

export default class TodoFilter extends Component {
  $filters;

  constructor($target, props) {
    super($target, props);

    this.$filters = this.$target.querySelectorAll('a');
    this.setDataToHTML();
    this.initEventListener();
  }

  setDataToHTML = () => {
    this.$filters.forEach(($filter) => {
      if ($filter.classList.contains(ALL))
        $filter.setAttribute('data-type', ALL);
      else if ($filter.classList.contains(ACTIVE))
        $filter.setAttribute('data-type', ACTIVE);
      else if ($filter.classList.contains(COMPLETED))
        $filter.setAttribute('data-type', COMPLETED);
    });
  };

  initEventListener = () => {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      this.$filters.forEach(($filter) => {
        if (target === $filter) {
          this.props.filterType.value = $filter.dataset.type;
          $filter.classList.add(SELECTED);
        } else {
          $filter.classList.remove(SELECTED);
        }
      });
    });
  };
}
