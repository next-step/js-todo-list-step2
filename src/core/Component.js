export const Component = class {

  $target; $state = {}; $props; #debounceRender;

  constructor(target, state, props) {
    this.$target = target;
    this.$props = props;
    this.setState(state);
    this.setEvent();
    this.#debounceRender = debounceOneFrame(() => this.render());
  }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.#debounceRender();
  }

  setEvent () {}
  render () {}
}