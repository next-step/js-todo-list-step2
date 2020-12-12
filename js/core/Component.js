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

  setEvents() {
    Object.entries(this.events).forEach(([type, methods]) =>
      methods.forEach((method) => {
        if (type.includes("key")) {
          const $input = this.dom.querySelector("input");
          $input.addEventListener(type, method.bind(this));
        } else {
          this.dom.addEventListener(type, method.bind(this));
        }
      })
    );
  }

  async render() {}
}
