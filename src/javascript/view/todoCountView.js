import { $ } from '../utils/querySelector.js';

export default class TodoCountView {
  constructor() {
    this._countContainer = $('.count-container');
    this._filterContainer = $('.filters');
    this._todoCount = 0;
    this._countView = $('.todo-count').children[0];
    this._currentFilterView = $('.all', this._filterContainer);
    this._currentFilter = 'all';
  }

  init(count) {
    this._todoCount = count;
    this.setTodoCount(count);
    this.setSelectFilter($('.all', this._filterContainer));
  }

  increaseTodoCount() {
    this._todoCount++;
  }

  decreaseTodoCount() {
    this._todoCount--;
  }

  setTodoCount(count) {
    this._countView.innerText = count;
  }

  getInnerTextCount() {
    return +this._countView.innerText;
  }

  getTodoCount() {
    return this._todoCount;
  }

  getCurrentFilter() {
    return this._currentFilter;
  }

  setSelectFilter(filter) {
    this._currentFilterView.classList.remove('selected');
    this._currentFilter = filter.className;
    this._currentFilterView = filter;
    this._currentFilterView.classList.add('selected');
  }

  setEvents(controller) {
    this._countContainer.addEventListener('click', (event) => {
      if (event.target.closest('li')) {
        this.setFilterEvent(event.target, controller);
      } else if (event.target.closest('.clear-completed')) {
        controller.deleteAll();
      }
    });
  }

  setFilterEvent(target, controller) {
    if (target.classList.contains('all')) {
      console.log(controller.selectAll);
      controller.selectAll();
    } else if (target.classList.contains('active')) {
      controller.selectActive();
    } else {
      controller.selectCompleted();
    }
    this.setSelectFilter(target);
  }
}
