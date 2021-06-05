import { $ } from '../../utils/utils.js';
import { DOM_ID, FILTER } from '../../constants/constants.js';
import { deleteAllItem } from '../../api/todolist.js';

export default class TodoCount {
  constructor({ setFilter, userState }) {
    this.$target = $(DOM_ID.TODO_COUNT);

    this.$filterMenu = {
      [FILTER.ALL]: this.$target.querySelector(`.${FILTER.ALL}`),
      [FILTER.ACTIVE]: this.$target.querySelector(`.${FILTER.ACTIVE}`),
      [FILTER.COMPLETED]: this.$target.querySelector(`.${FILTER.COMPLETED}`),
    };

    this.setFilter = setFilter;
    this.userState = userState;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('click', this._changeFilter.bind(this));
    this.$target.addEventListener('click', this.allDelete.bind(this));
  }

  async allDelete({ target }) {
    if (!target.classList.contains(FILTER.ALL_DELETED)) return;

    const { userId } = this.userState.get();
    // console.log('deleted', userId);

    const result = await deleteAllItem(userId);
    console.log(result);

    this.setFilter();
  }

  _changeFilter(event) {
    // console.log('click');
    event.stopPropagation();

    const filter = event.target.classList[0];
    if (!this._isFilterClass(filter)) return;

    // 모든 filter 요소의 style 삭제 후 특정 class만 style 등록
    Object.keys(this.$filterMenu).map((key) => this.$filterMenu[key].classList.remove('selected'));
    event.target.classList.add('selected');

    this.setFilter(filter);
  }

  _isFilterClass(filter) {
    return filter === FILTER.ALL || filter === FILTER.ACTIVE || filter === FILTER.COMPLETED;
  }

  renderCount(count) {
    this.$target.querySelector('.todo-count > strong').innerHTML = count;
  }
}
