import Component from '../core/Component.js';

export default class TodoInput extends Component {
  constructor($target, props) {
    super($target, props);
  }

  initEventListener() {
    this.$target.addEventListener('keyup', ({ key, target }) => {
      if (key === 'Enter') {
        if (!target.value) return;
        this.props.addTodo(target.value);
        this.$target.value = '';
      }
    });
  }
}
