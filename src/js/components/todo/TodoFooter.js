import { FILTER, ACTION, CLASS_NAME } from "../../const/TODO.js";
import { $ } from "../../utils/element.js";

class TodoFooter {
  constructor() {
    this.$todoFooter = $(CLASS_NAME.TODO_COUNTER_CONTAINER);
    this.counter = 0;
    this.filterBy = '';
    this.render();
  }

  setState(counter) {
    this.counter = counter;
    this.renderCounter();
  }

  renderCounter() {
    const $todoCounter = $(CLASS_NAME.TODO_COUNTER);
    $todoCounter.textContent = this.counter;
  }

  getFooterHTML() {
    return `
    <span class="todo-count">총 <strong class="todo-counter"></strong> 개</span>
    <ul class="filters">
      <li>
        <a href="#" data-action="${FILTER.ALL}" class="all selected">전체보기</a>
      </li>
      <li>
        <a href="#active" data-action="${FILTER.ACTIVE}" class="active">해야할 일</a>
      </li>
      <li>
        <a href="#completed" data-action="${FILTER.COMPLETED}" class="completed">완료한 일</a>
      </li>
    </ul>
    <button class="clear-completed" data-action="${ACTION.DELETE_ALL_ITEMS}">모두 삭제</button>
  `
  }
  
  render() {
    this.$todoFooter.innerHTML = this.getFooterHTML();
  }

  onClickEvent({ filter, deleteAll }, target) {
    const { action } = target.dataset;

    action === ACTION.DELETE_ALL_ITEMS && deleteAll();

    const filterTypes = Object.keys(FILTER);
    filterTypes.includes(action) && filter(action);

  }
  setEvent(customEvent) {
    this.$todoFooter.addEventListener('click', ({ target }) => this.onClickEvent(customEvent, target))
  }
}

export default function() {
  return new TodoFooter();
}
