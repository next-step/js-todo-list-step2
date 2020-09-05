import { debounceOneFrame } from "../utils/index.js";

export const Component = class {

  $state = {}; $props; $render;

  constructor(target, state, props) {
    this.$props = props;
    this.$render = debounceOneFrame(() => {
      target.innerHTML = this.render();
    });
    this.setEvent(target);
    this.setState(state);
  }

  setEvent (target) {}
  render () { return '' }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.$render();
  }

}