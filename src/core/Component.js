import { debounceOneFrame } from "../utils/index.js";

export const Component = class {

  $state = {}; $props; #debounceRender

  constructor(target, state, props) {
    this.$props = props;
    this.#debounceRender = debounceOneFrame(() => {
      target.innerHTML = this.render();
    });
    this.setEvent(target);
    this.setState(state);
  }

  setEvent (target) {}
  render () { return '' }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.#debounceRender();
  }

}