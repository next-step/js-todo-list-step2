import { isEnterKey } from '../validator.js';

export default class Input {
  constructor({ $element, onEnter }) {
    this.$element = $element;
    this.handleEnter = onEnter;

    this.$element.addEventListener('keypress', e => {
      const value = e.target.value.trim();
      if (isEnterKey(e) && value) {
        this.handleEnter(value);
        this.$element.value = '';
      }
    });
  }
}
