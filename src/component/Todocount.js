/* eslint-disable prettier/prettier */
import CONSTANT from '../constants.js';

class Todocount {
  constructor({ $todoapp, onClick }) {
    this.onClick = onClick;
    this.$target = document.createElement('div');
    this.$target.className = 'count-container';
    $todoapp.appendChild(this.$target);
    this.render();
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }
  template() {
    if (!this.state) return;
    const { filter, counter } = this.state;

    return `
    <span class="todo-count">총 <strong>${counter}</strong> 개</span>
    <ul class="filters">
      <li>
        <a href="#" class="all ${filter === CONSTANT.ALL ? 'selected' : ''}">전체보기</a>
      </li>
      <li>
        <a href="#active" class="active ${filter === CONSTANT.ACTIVE ? 'selected' : ''}">해야할 일</a>
      </li>
      <li>
        <a href="#completed" class="completed ${filter === CONSTANT.COMPLETED ? 'selected' : ''}">완료한 일</a>
      </li>
    </ul>
    <button class="clear-completed">모두 삭제</button>`;
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  mounted() {
    this.$target.addEventListener('click', (e) => {
      const className = e.target.className.split(' ')[0];
      this.onClick(className);
    });
  }
}

/*
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
          <ul class="filters">
            <li>
              <a href="#" class="all selected">전체보기</a>
            </li>
            <li>
              <a href="#active" class="active">해야할 일</a>
            </li>
            <li>
              <a href="#completed" class="completed">완료한 일</a>
            </li>
          </ul>
          <button class="clear-completed">모두 삭제</button>
        </div>
        */

export default Todocount;
