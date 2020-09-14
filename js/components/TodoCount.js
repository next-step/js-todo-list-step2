import Component from '../core/Component.js';

export default class TodoCount extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }
  render() {
    this.$target.innerHTML = `총 <strong>${this.props.count}</strong> 개`;
  }
}
