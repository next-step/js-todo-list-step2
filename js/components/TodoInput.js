import DOM from '../core/createElement.js';
import { onCreateTodoInputEnterKeypress } from '../actions/index.js';

export default class TodoInput {
  constructor() {
    this.$inputContainer = DOM.section({
      class: 'input-container',
    });
    this.$input = DOM.input({
      class: 'new-todo',
      placeholder: '할 일을 입력해주세요.',
      autofocus: true,
      onkeypress: onCreateTodoInputEnterKeypress,
    });

    this.render();
  }

  get $el() {
    return this.$inputContainer;
  }

  render() {
    this.$inputContainer.appendChild(this.$input);
  }
}
