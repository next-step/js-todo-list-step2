export class TodoFilter {
  constructor({ onFilterItem }) {
    this.todoFilters = document.querySelector('.filters');
    this.handleFilterItem = onFilterItem;

    this.init();
  }

  init() {
    this.todoFilters.addEventListener('click', (e) => {
      const target = e.target;
      const selectedEls = this.todoFilters.querySelectorAll('a.selected');
      const filter = target.classList.contains('active')
        ? 'active'
        : e.target.classList.contains('completed')
        ? 'completed'
        : 'all';

      e.preventDefault();
      this.handleFilterItem(filter);
      selectedEls.forEach((el) => el.classList.remove('selected'));
      target.classList.add('selected');
    });
  }
}
