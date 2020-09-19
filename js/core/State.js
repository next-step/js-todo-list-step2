export default class State {
  #renders;
  #value;

  constructor(initialValue, render) {
    this.#value = initialValue;
    this.#renders = new Set([render]);
  }

  subscribe = (render) => {
    this.#renders.add(render);
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

export class ComputedState extends State {
  #value;

  constructor(value, render, dependencies) {
    super(value(), render);

    const handler = () => {
      this.#value = value();
      this.renderAll();
    };

    dependencies.forEach((dependency) => dependency.subscribe(handler));
  }

  get value() {
    return this.#value;
  }
}
