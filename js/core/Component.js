export default class Component {
  target;
  dom;
  components = {};
  events = {};

  constructor(target) {
    this.target = target;
    this.#load();
  }

  async #load() {
    this.dom = document.querySelector(this.target);
    this.dom.innerHTML = await this.render();

    this.init();
    await this.setComponents();
    this.setEvents();
  }

  init() {}

  async setComponents() {
    Object.entries(this.components).forEach(([key, value]) => {
      this.components[key] = new value(key);
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
