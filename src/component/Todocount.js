class Todocount {
  constructor({ $todoapp }) {
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
    return `
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
    <button class="clear-completed">모두 삭제</button>`;
  }
  render() {
    this.$target.innerHTML = this.template();
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
