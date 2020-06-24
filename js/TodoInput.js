import { KEY_NAME } from './util/constants.js';

export default class TodoInput {
  constructor({ $targetTodoInput, onInput }) {
    this.$targetTodoInput = $targetTodoInput;

    this.$targetTodoInput.addEventListener('click', (e) => {
      e.target.value = '';
    });

    this.$targetTodoInput.addEventListener('keyup', (e) => {
      if (e.key === KEY_NAME.ENTER) {
        e.target.value && onInput(e.target.value);
        e.target.value = '';
      }
    });
  }
}
