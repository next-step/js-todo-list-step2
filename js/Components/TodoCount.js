import { validateInstance } from "../utils.js";
function TodoCount($target, count) {
  validateInstance(TodoCount, this);
  this.count = count || 0;

  this.setState = (nextCount) => {
    this.count = nextCount;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
        <span class="todo-count">총 <strong>${this.count}</strong> 개</span>
    `;
  };

  this.render();
}

export default TodoCount;
