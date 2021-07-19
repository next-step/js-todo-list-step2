import { $ } from '@utils/utils.js';
import { DOM_ID, FILTER } from '@constants/constants.js';
import { todoListService } from '@api/todolist.js';

import todoState from '@store/todoState.js';
import userState from '@store/userState.js';
import filterState from '@store/filterState.js';

export default class TodoCount {
  constructor() {
    this.$target = $(DOM_ID.TODO_COUNT);

    this.$filterMenu = {
      [FILTER.ALL]: this.$target.querySelector(`.${FILTER.ALL}`),
      [FILTER.ACTIVE]: this.$target.querySelector(`.${FILTER.ACTIVE}`),
      [FILTER.COMPLETED]: this.$target.querySelector(`.${FILTER.COMPLETED}`),
    };

    this.filterState = filterState;
    this.userState = userState;
    this.todoState = todoState;

    this.addEvent();
  }

  addEvent() {
    this.$target.addEventListener('click', this.changeFilter.bind(this));
    this.$target.addEventListener('click', this.allDelete.bind(this));
  }

  async allDelete({ target }) {
    if (!target.classList.contains(FILTER.ALL_DELETED)) return;

    const { userId } = this.userState.get();

    const result = await todoListService.deleteAllItem(userId);
    if (result['success']) {
      this.filterState.set(FILTER.ALL);
      this.todoState.set([]);
    }
  }

  changeFilter(event) {
    event.stopPropagation();

    const filter = event.target.classList[0];
    if (!this.isFilterClass(filter)) return;

    // 모든 filter 요소의 style 삭제 후 특정 class만 style 등록
    Object.keys(this.$filterMenu).map((key) => this.$filterMenu[key].classList.remove('selected'));
    event.target.classList.add('selected');

    this.filterState.set(filter);
  }

  isFilterClass(filter) {
    return filter === FILTER.ALL || filter === FILTER.ACTIVE || filter === FILTER.COMPLETED;
  }

  renderCount(count) {
    this.$target.querySelector(DOM_ID.TODO_COUNT_RENDER).textContent = count;
  }
}
