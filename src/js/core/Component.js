export default class Component {
  $target;

  constructor($target, store, props = null) {
    this.$target = $target;
    this.store = store;
    this.props = props;
    this.render();
    this.bindEvents();
  }

  render() {}
  bindEvents() {}
}
