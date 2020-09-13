export default class State {
  #renders;
  #value;

  constructor(initialValue) {
    this.#value = initialValue;
    this.#renders = [];
  }

  subscribe = (render) => {
    this.#renders.push(render);
  };

  renderAll = () => {
    this.#renders.forEach((render) => render());
  };

  get value() {
    return this.#value;
  }

  set value(newValue) {
    if (newValue !== this.#value) {
      this.#value = newValue;
      this.renderAll();
    }
  }
}
