export default class Component {
  target;
  props = {};
  dom;
  components = {};
  events = {};

  constructor(target) {
    this.target = target;
    this.dom = document.querySelector(target);
    this.setProps();
    this.#load();
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
    return { key: name.slice(5), value };
  }

  init() {}

  async setComponents() {
    Object.entries(this.components).forEach(([target, Component]) => {
      this.components[target] = new Component(target);
    });
  }

  async setState() {
    this.dom = document.querySelector(this.target);
    this.dom.innerHTML = await this.render();
    for (const component of Object.values(this.components)) {
      await component.setState();
    }
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
