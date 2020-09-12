import {addEventBubblingListener, debounceOneFrame} from "../utils/index.js";

export const Component = class {

  $target;
  $state = {}
  $props = {};
  $children = {};
  $stores = [];

  constructor($target, $props = {}) {
    this.$target = $target;
    this.$props = $props;
    this.#setup();
  }

  async #setup () {
    await this.componentInit();
    this.$stores.forEach(store => store.addObserver(this));
    this.render();
    this.componentDidMount();
    this.setEvent();
  }

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

  componentInit () {}
  componentDidUpdate () {}
  componentDidMount () {}
  setEvent () {}
  template () { return '' }
}