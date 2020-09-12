import {addEventBubblingListener, debounceOneFrame} from "../utils/index.js";

export const Component = class {

  $target; $state = {}; $props = {}; $children;

  constructor(target, state, props) {
    this.$props = props;
    this.componentInit();
    this.render();
    this.componentDidMount();
    this.setEvent();
  }

  componentInit () {}
  componentDidUpdate () {}
  componentDidMount () {}
  setEvent () {}
  template () { return '' }

  render = debounceOneFrame(() => {
    this.$target.innerHTML = this.template();
    this.#childrenBuild();
    this.componentDidUpdate()
  });

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.render();
  }

  addEvent (eventType, ref, callback) {
    addEventBubblingListener(eventType, this.$target, `[data-ref="${ref}"]`, callback);
  }


  #childrenBuild () {
    this.$target.querySelectorAll('[data-component]').forEach(target => {
      const { constructor, props } = this.$children[target.dataset.component];
      new constructor(target, props);
    })
  }

}