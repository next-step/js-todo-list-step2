class UserTitle {
  #state;
  constructor($target, user) {
    this.$target = $target;
    this.#state = { user };
    this.render();
  }

  setState = (state) => {
    if (state?.user) {
      this.#state.user = state.user;
    }
    this.render();
  };

  render = () => {
    this.$target.innerHTML = `
      <span>
        <strong>${this.#state.user}</strong>'s Todo List
      </span>
      `;
  };
}

export default UserTitle;
