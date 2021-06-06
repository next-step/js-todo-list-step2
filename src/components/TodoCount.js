import { SELECTED } from '../constants.js';

export default class TodoCount {
  constructor({ onFilter }) {
    this.$todoCountContainer = document.querySelector('.count-container');

    this.$filterButtons = {
      all: this.$todoCountContainer.querySelector('.all'),
      active: this.$todoCountContainer.querySelector('.active'),
      completed: this.$todoCountContainer.querySelector('.completed'),
    };

    this.$todoCountContainer.addEventListener('click', (event) => this.changeFilterButtonStatus(event, onFilter));
  }

  render(count) {
    const todoCount = this.$todoCountContainer.querySelector('strong');
    todoCount.innerText = count;
  }

  changeFilterButtonStatus(event, onFilter) {
    const filterButtonTarget = event.target;
    if (filterButtonTarget.tagName !== 'A') return;

    const [filterName] = filterButtonTarget.classList;
    Object.keys(this.$filterButtons).map((key) => this.$filterButtons[key].classList.remove(SELECTED));
    this.$filterButtons[filterName].classList.add(SELECTED);
    onFilter(filterName);
  }
}
