import DOM from '../core/createElement.js';

export default class TodoInput {
  constructor() {
    this.$inputContainer = DOM.section({ class: 'input-container' });

    this.render();
  }

  get $el() {
    return this.$inputContainer;
  }

  render() {
    this.$inputContainer.innerHTML = `
      <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus
      />
    `;
  }
}
