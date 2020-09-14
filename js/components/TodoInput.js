import Component from '../core/Component.js';

export default class TodoInput extends Component {
  constructor($target, props) {
    super($target, props);

    this.initEventListener();
  }

  initEventListener = () => {
    this.$target.addEventListener('keyup', ({ key, target }) => {
      if (key === 'Enter') {
        this.props.addTodo(target.value);
        this.$target.value = '';
      }
    });
  };
}
