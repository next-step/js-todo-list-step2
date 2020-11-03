import DOM from '../core/createElement.js';
import { onChangeUserButtonClick } from '../actions/index.js';

export default class UserItem {
  constructor({ _id, name, isActive }) {
    this.$userItem = DOM.button({
      class: isActive ? 'ripple active' : 'ripple',
      dataUserId: _id,
      innerText: name,
      onclick: onChangeUserButtonClick,
    });
  }

  get $el() {
    return this.$userItem;
  }
}
