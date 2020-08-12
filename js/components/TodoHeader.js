export default class TodoHeader {
  constructor({ $element, userName }) {
    this.$element = $element;
    this.name = userName;

    this.render();
  }

  render() {
    this.$element.setAttribute('data-username', this.name);
    this.$element.innerHTML = `<span><strong>${this.name}</strong>'s Todo List</span>`;
  }

  setState(name) {
    this.name = name;
    this.render();
  }
}
