export default class Component {
  target;
  key;
  props = {};
  dom;
  components = {};
  events = {};

  constructor(target, key) {
    this.target = target;
    this.key = key;
    this.setDom();
    this.setProps();
    this.#load();
  }

  setDom() {
    if (!this.key) {
      this.dom = document.querySelector(this.target);
      return;
    }
    this.dom = document.querySelector(`${this.target}[key="${this.key}"]`);
  }

  async #load() {
    this.dom.innerHTML = await this.render();

    this.init();
    await this.setComponents();
    this.setEvents();
  }

  setProps() {
    const attributes = Array.from(this.dom.attributes);
    const props = attributes.filter(({ name }) => name.includes("data-"));
    if (props.length === 0) {
      return;
    }

    props
      .map(this.#mapProp)
      .forEach(({ key, value }) => (this.props[key] = value));
  }

  #mapProp({ name, value }) {
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else if (!isNaN(value)) {
      value = parseInt(value);
    }
    return { key: name.slice(5), value };
  }

  init() {}

  async setComponents() {
    this.#resetComponents();
    Object.entries(this.components).forEach(([target, SubComponent]) =>
      this.#drawComponents(target, SubComponent)
    );
  }

  #resetComponents() {
    Object.keys(this.components)
      .filter((key) => this.components[key] instanceof Component)
      .forEach((key) => delete this.components[key]);
  }

  async #drawComponents(target, SubComponent) {
    const targets = Array.from(document.querySelectorAll(target));
    if (targets.length === 0) {
      return;
    }

    if (targets.length < 2) {
      this.components[`${target}-component`] = new SubComponent(target);
      return;
    }

    targets.forEach((t) => {
      const key = t.attributes.key.value;
      this.components[`${target}-${key}`] = new SubComponent(target, key);
    });
  }

  async setState() {
    this.setDom();
    this.dom.innerHTML = await this.render();
    await this.setComponents();
    this.setEvents();
  }

  setEvents() {
    Object.entries(this.events).forEach(([type, methods]) =>
      methods.forEach((method) => this.#addEventListener(type, method))
    );
  }

  #addEventListener(type, method) {
    const targets = this.dom.querySelectorAll(`[data-action="${method.name}"]`);
    targets.forEach((target) =>
      this.#addEventListenerOnce(target, type, method)
    );
  }

  #addEventListenerOnce(target, type, method) {
    if (!target.getAttribute(method.name)) {
      target.addEventListener(type, method.bind(this));
      target.setAttribute(method.name, type);
    }
  }

  async render() {}
}

function props(obj) {
  return Object.entries(obj)
    .map(([key, value]) => `data-${key}="${value}"`)
    .join(" ");
}

export { props };
