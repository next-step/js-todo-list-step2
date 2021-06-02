class Todoinput {
  constructor({ $todoapp }) {
    this.$target = document.createElement('section');
    this.$target.className = 'input-container';
    $todoapp.appendChild(this.$target);

    this.render();
  }
  template() {
    return `
    <section class="input-container">
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

/* 
  <section class="todoapp">
        <section class="input-container">
          <input
            class="new-todo"
            placeholder="할 일을 입력해주세요."
            autofocus
          />
    </section> */

export default Todoinput;
