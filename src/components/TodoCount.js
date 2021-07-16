import { ALL, ACTIVE, COMPLETED } from '../constants/todo.js';

export default class TodoCount {
  constructor({ $target, initialState, onClick }) {
    this.state = initialState;
    this.countContainer = document.createElement('div');
    this.countContainer.className = 'count-container';
    this.countContainer.addEventListener('click', ({ target }) => {
      if (target.dataset.action) onClick(target.dataset.action);
    });

    $target.appendChild(this.countContainer);
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.countContainer.innerHTML = `
      <span class="todo-count">총 <strong>${this.state.count}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#" class="all${
            this.state.show === ALL ? ' selected' : ''
          }" data-action="${ALL}">전체보기</a>
        </li>
        <li>
          <a href="#active" class="active${
            this.state.show === ACTIVE ? ' selected' : ''
          }" data-action="${ACTIVE}">해야할 일</a>
        </li>
        <li>
          <a href="#completed" class="completed${
            this.state.show === COMPLETED ? ' selected' : ''
          }" data-action="${COMPLETED}">완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed">모두 삭제</button>
      `;
  }
}
