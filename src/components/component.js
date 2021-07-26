export default class Component {
  constructor($app, props) {
    this.$app = $app;
    this.props = props;
    this.render();
    this.mount();
  }
  mount() {}
  render() {}
}
