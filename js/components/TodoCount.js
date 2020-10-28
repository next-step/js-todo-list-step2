import Component from '../core/Component.js';

export default class TodoCount extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.todoList.subscribe(this.render);
    this.render();
  }
  render = () => {
    this.$target.innerHTML = `
      총 <strong>${this.props.todoList.value?.length || 0}</strong> 개
    `;
  };
}
