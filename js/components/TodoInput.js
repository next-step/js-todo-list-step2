import { Observer } from '../observer/Observer.js';

export const TodoInput = class extends Observer {
  setEvent() {
    this._target.addEventListener('keyup', ({ target, key }) => {
      if (key === 'Enter' && target.value !== '') {
        this._service.addItem(target.value.toString());
        target.value = '';
      }
    });
  }
};
