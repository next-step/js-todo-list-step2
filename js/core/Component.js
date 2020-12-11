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
  }

  init() {}

  async setState() {
    this.dom = document.querySelector(this.target);
    this.dom.innerHTML = await this.render();
    Object.values(this.components).forEach((component) => component.setState());
  }

  setEvents() {
    Object.entries(this.events).forEach(([type, methods]) =>
      methods.forEach((method) =>
        this.dom.addEventListener(type, method.bind(this))
      )
    );
  }

  async render() {}
}
