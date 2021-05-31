import { $ } from '../utils/querySelector.js';

export default class InputView {
  constructor() {
    this._input = $('.new-todo');
  }

  setEvents(controller) {
    this._input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        controller.add(this._input.value);
      }
    });
  }

  clear() {
    this._input.value = '';
  }
}
