export default class Title {
  constructor({ $target }) {
    this.$title = document.createElement('h1');
    this.$title.id = 'user-title';

    $target.appendChild(this.$title);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$title.innerHTML = `<span><strong>${this.state}</strong>'s Todo List</span>`;
  }
}
