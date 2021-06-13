import { CLASS_NAME } from '../constants.js';

export default class TodoCount {
  constructor({ onFilter, onClear }) {
    this.$todoCountContainer = document.querySelector('.count-container');

    this.$filterButtons = {
      all: this.$todoCountContainer.querySelector('.all'),
      active: this.$todoCountContainer.querySelector('.active'),
      completed: this.$todoCountContainer.querySelector('.completed'),
    };

    this.$todoCountContainer.addEventListener('click', (event) => this.changeFilterButtonStatus(event, onFilter));
    this.$todoCountContainer.addEventListener('click', (event) => this.clearTodoList(event, onClear));
  }

  render(count) {
    const todoCount = this.$todoCountContainer.querySelector('strong');
    todoCount.innerText = count;
  }

  changeFilterButtonStatus(event, onFilter) {
    const filterButtonTarget = event.target;
    if (filterButtonTarget.tagName !== 'A') return;

    const [filterName] = filterButtonTarget.classList;
    Object.keys(this.$filterButtons).map((key) => this.$filterButtons[key].classList.remove(CLASS_NAME.SELECTED));
    this.$filterButtons[filterName].classList.add(CLASS_NAME.SELECTED);
    onFilter(filterName);
  }

  clearTodoList(event, onClear) {
    const clearButtonTarget = event.target;
    if (!clearButtonTarget.classList.contains('clear-completed')) return;
    onClear();
  }
}
