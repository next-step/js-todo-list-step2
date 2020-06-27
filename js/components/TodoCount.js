export default class TodoCount {
  constructor({ $element, totalCount, completeCount }) {
    this.$countContainer = $element;
    this.totalCount = totalCount;
    this.completeCount = completeCount;

    this.render();
  }

  render() {
    const totalTemplate = `<span id="todo-count" class="todo-count">총 <span class="count">${this.totalCount}</span> 개 중</span>`;
    const completeTemplate = `<span id="completed-count" class="todo-count"><span class="count">${this.completeCount}</span> 개 완료</span>`;
    this.$countContainer.innerHTML = `${totalTemplate}${completeTemplate}`;
  }

  setState({ totalCount, completeCount }) {
    this.totalCount = totalCount;
    this.completeCount = completeCount;
    this.render();
  }
}
