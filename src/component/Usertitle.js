import CONSTANT from '../constants.js';

class Usertitle {
  constructor({ $app, activeName }) {
    this.activeName = activeName;
    const $target = document.createElement('h1');
    this.$target = $target;
    this.$target.id = 'user-title';
    $app.appendChild($target);
    this.render();
  }
  setState(nextName) {
    this.activeName = nextName;
    this.render();
  }

  template() {
    return this.activeName === CONSTANT.UNKNOWN
      ? '<span>Loading⏰</span>'
      : `<span><strong>${this.activeName}</strong>'s Todo List</span>`;
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Usertitle;
