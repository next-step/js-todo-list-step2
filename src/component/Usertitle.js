import CONSTANT from '../constants.js';

class UserTitle {
  constructor({ $app, userName }) {
    this.userName = userName;
    const $target = document.createElement('h1');
    this.$target = $target;
    this.$target.id = 'user-title';
    $app.appendChild($target);
    this.render();
  }
  setState(nextName) {
    this.userName = nextName;
    this.render();
  }

  template() {
    return this.userName === CONSTANT.UNKNOWN
      ? 'Loading...'
      : `${this.userName}s TodoList`;
  }

  render() {
    this.$target.innerText = this.template();
  }
}

export default UserTitle;
