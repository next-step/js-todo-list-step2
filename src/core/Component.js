export const Component = class {

  $target; $state; $props;

  constructor (target, state = {}, props = {}) {
    this.$target = target;
    this.$props = props;
    this.$state = state;
    this.#setup();
  }

  async #setup () {
    this.setEvent();
    await this.init();
    this.setState(this.$state);
    this.componentDidMount();
  }

  init () {};

  #render () {
    this.$target.innerHTML = this.render();
  }

  render () {
    return '';
  }

  componentDidMount () {}

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.#render();
  }

  setEvent () {}
  addEvent () {}

}