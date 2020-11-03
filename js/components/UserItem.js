import DOM from '../core/createElement.js';

export default class UserItem {
  constructor({ _id, name, isActive }) {
    this.$userItem = DOM.button({
      class: isActive ? 'ripple active' : 'ripple',
      dataUserId: _id,
      innerText: name,
    });
  }

  get $el() {
    return this.$userItem;
  }
}
