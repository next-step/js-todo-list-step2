import DOM from '../core/createElement.js';
import { onTodoItemClickHandler } from '../actions/index.js';

export default class TodoItem {
  constructor({ _id, contents, isCompleted, priority }) {
    this.$todoItem = DOM.li({
      dataTodoId: _id,
      class: isCompleted && 'completed',
    });

    this.render({ contents, isCompleted, priority });
  }

  get $el() {
    return this.$todoItem;
  }

  render({ contents, isCompleted, priority }) {
    this.$todoItem.innerHTML = `
      <div class="view">
        <input class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
        <label class="label">
          <select class="${
            priority === 'FIRST'
              ? 'chip select primary'
              : priority === 'SECOND'
              ? 'chip select secondary'
              : 'chip select'
          }">
            <option value="0">순위</option>
            <option value="1" ${priority === 'FIRST' && 'selected'}>1순위</option>
            <option value="2" ${priority === 'SECOND' && 'selected'}>2순위</option>
          </select>${contents}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${contents}" />
    `;
  }
}
