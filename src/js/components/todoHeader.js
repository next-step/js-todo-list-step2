class TodoHeader {
  constructor($target) {
    this.$target = $target;
    this.state = '';
    this.render();
  }
  setState(nextState) {
    this.state = nextState;
    this.render();
  }
  render() {
    const strongDOM = this.$target.querySelector('strong');
    strongDOM.textContent = this.state;
  }
}

export default TodoHeader;