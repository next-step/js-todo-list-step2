import DOM from '../core/createElement.js';

export default class UserTitle {
  constructor() {
    this.$title = DOM.h1({ id: 'user-title' });
    this.render();
  }

  get $el() {
    return this.$title;
  }

  setState({ user }) {
    if (!user) {
      return;
    }

    const { _id, name } = user;

    this.$title.dataset.userId = _id;
    this.render(name);
  }

  render(name = 'your') {
    this.$title.innerHTML = `<span><strong>${name}</strong>'s Todo List</span>`;
  }
}
