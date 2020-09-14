import Component from '../core/Component.js';

export default class UserTitle extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.activeUser.subscribe(this.render);
  }

  render = () => {
    const $innerStrong = this.$target.querySelector('strong');
    $innerStrong.innerHTML = this.props.activeUser.value.name;
  };
}
