import { COMPLETE, FIRST, NONE } from "../constant/constant.js";

class TodoItem {
  constructor(isCompleted, content, index, priority) {
    this.isCompleted = isCompleted;
    this.content = content;
    this.index = index;
    this.priority = priority;
  }
  template() {
    const classTemplate =
      this.isCompleted === COMPLETE ? 'class="completed"' : "";
    const checkedTemplate = this.isCompleted === COMPLETE ? "checked" : "";
    const priority = this.priority === FIRST ? "primary" : "secondary";
    const chip =
      this.priority === NONE
        ? `<select class="chip select">
    <option value="0" selected>순위</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
  </select>`
        : `<span class="chip ${priority}">${this.priority}</span>`;
    const template = `<li ${classTemplate} data-index=${this.index}>
    <div class="view">
      <input class="toggle" type="checkbox" ${checkedTemplate}/>
      <label class="label">
        ${chip}
        ${this.content}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`;
    return template;
  }
}

export default TodoItem;
