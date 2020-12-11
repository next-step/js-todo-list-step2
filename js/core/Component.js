export default class Component {
  dom;
  props = {};
  components = {};
  events = {};

  constructor(target, props = {}) {
    this.dom = document.querySelector(target);
    this.dom.innerHTML = this.render();

    this.props = props;

    this.init();
    this.setEvents();
  }

  init() {}

  setState() {
    this.dom.innerHTML = this.render();
    Object.values(this.components).forEach((component) => component.setState());
  }

  setEvents() {
    Object.entries(this.events).forEach(([type, methods]) =>
      methods.forEach((method) =>
        this.dom.addEventListener(type, method.bind(this))
      )
    );
  }

  render() {}
}
