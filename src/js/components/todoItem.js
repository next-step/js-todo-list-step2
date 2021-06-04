import { COMPLETE } from '../constant/constant.js';

class TodoItem {
  constructor(state, title, index, priority) {
    this.state = state;
    this.title = title;
    this.index = index;
    this.priority = priority;
  }
  template() {
    const classTemplate = this.state === COMPLETE ? 'class="completed"' : '';
    const checkedTemplate = this.state === COMPLETE ? 'checked' : '';
    let template = `<li ${classTemplate} data-index=${this.index}>
    <div class="view">
      <input class="toggle" type="checkbox" ${checkedTemplate}/>
      <label class="label">${this.title}</label>
      <span class="chip secondary">${this.priority}{</span>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀" />
  </li>`;
    return template;
  }
}

export default TodoItem;