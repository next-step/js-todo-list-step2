import Component from "../../core/Component.js";

export default class TodoCount extends Component {
  render() {
    this.$target.innerHTML = `
      총 <strong>${this.store.todoListLength}</strong> 개
    `;
  }
}
