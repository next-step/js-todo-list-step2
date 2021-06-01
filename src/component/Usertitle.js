import CONSTANT from '../constants.js';

class Usertitle {
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
      ? '<span>Loading⏰</span>'
      : `<span><strong>${this.userName}</strong>'s Todo List</span>`;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Usertitle;
