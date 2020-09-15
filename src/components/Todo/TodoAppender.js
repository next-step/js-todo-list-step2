import { Component } from "../../core/Component.js";

export const TodoAppender = class extends Component {

  template () {
    return `
      <input
        data-ref="append"
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus />
    `
  }

  setEvent () {
    this.addEvent('keypress', 'append', ({ key, target }) => {
      if (key !== 'Enter') return;
      this.$props.appendItem(target.value);
      target.value = '';
    })
  }
}