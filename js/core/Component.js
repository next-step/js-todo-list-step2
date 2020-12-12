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
    this.setEvents();
    await this.setState();
  }

  init() {}

  async setState() {
    this.dom = document.querySelector(this.target);
    this.dom.innerHTML = await this.render();
    for (const component of Object.values(this.components)) {
      await component.setState();
    }
    this.setEvents();
  }

  #addEventListenerOnce(target, type, method) {
    if (!target.getAttribute(method.name)) {
      target.addEventListener(type, method.bind(this));
      target.setAttribute(method.name, type);
    }
  }

  #addEventListener(type, method) {
    if (type.includes("key")) {
      const $input = this.dom.querySelector("input");
      this.#addEventListenerOnce($input, type, method);
    } else {
      this.#addEventListenerOnce(this.dom, type, method);
    }
  }

  setEvents() {
    Object.entries(this.events).forEach(([type, methods]) =>
      methods.forEach((method) => this.#addEventListener(type, method))
    );
  }

  async render() {}
}
