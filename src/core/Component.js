import {addEventBubblingListener, debounceOneFrame} from "../utils/index.js";
import {observable, observe} from "./Observer.js";

export const Component = class {

  $target;
  $props;
  $state = {};

  constructor($target, $props = {}) {
    this.$target = $target;
    this.$props = $props;
    this.#setup();
  }

  async #setup () {
    await this.componentInit();
    this.$state = observable(this.$state);
    observe(() => this.render());
    this.componentDidMount();
    this.setEvent();
  }

  render = debounceOneFrame(() => {
    this.$target.innerHTML = this.template();
    this.#childrenBuild();
    this.componentDidUpdate()
  });

  setState (payload) {
    for (const [key, value] in Object.entries(payload)) {
      this.$state[key] = value;
    }
  }

  addEvent (eventType, ref, callback) {
    addEventBubblingListener(eventType, this.$target, `[data-ref="${ref}"]`, event => {
      event.index = Number(event.target.closest('[data-index]')?.dataset?.index || -1);
      callback(event);
    });
  }

  $children = () => {};
  #childrenBuild () {
    const children = this.$children();
    this.$target.querySelectorAll('[data-component]').forEach(target => {
      const { constructor, props } = children[target.dataset.component];
      new constructor(target, props);
    })
  }

  componentInit () {}
  componentDidUpdate () {}
  componentDidMount () {}
  setEvent () {}
  template () { return '' }
}
