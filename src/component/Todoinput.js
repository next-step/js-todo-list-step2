class Todoinput {
  constructor({ $todoapp, onKeyup }) {
    this.onKeyup = onKeyup;
    this.$target = document.createElement('section');
    this.$target.className = 'input-container';
    $todoapp.appendChild(this.$target);

    this.setEvent();
    this.render();
  }
  setEvent() {
    this.$target.addEventListener('keyup', this.onKeyup);
  }

  template() {
    return `
    <input
      class="new-todo"
      placeholder="할 일을 입력해주세요."
      autofocus
    />
    `;
  }
  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Todoinput;
