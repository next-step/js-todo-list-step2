import Component from '../core/Component.js';

export default class TodoClearBtn extends Component {
  constructor($target, props) {
    super($target, props);

    this.initEventListener();
  }

  initEventListener = () => {
    this.$target.addEventListener('click', this.props.clearTodo);
  };
}
