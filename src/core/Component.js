export const Component = class {

  $target; $state = {}; $props;

  constructor(target, state, props) {
    this.$target = target;
    this.$props = props;
    this.setState(state);
    this.setEvent();
  }

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.render();
  }

  setEvent () {}
  render () {}
}