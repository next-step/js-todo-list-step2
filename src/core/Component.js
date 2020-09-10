export const Component = class {

  #target; #state; #props;

  constructor (target, state = {}, props = {}) {
    this.#target = target;
    this.#props = props;
    this.#state = state;
    this.setEvent();
    this.setState(this.#state);
  }

  #render () {
    this.#target.innerHTML = this.render();
    this.componentDidMount();
  }

  render () {
    return '';
  }

  componentDidMount () {

  }

  setState (payload) {
    this.#state = { ...this.#state, ...payload };
    this.#render(this.#props);
  }

  setEvent () {}
  addEvent () {}

}