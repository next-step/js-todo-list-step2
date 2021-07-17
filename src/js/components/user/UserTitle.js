import Component from "../../core/Component.js";

export default class UserTitle extends Component {
  render() {
    this.$target.setAttribute("data-username", this.store.selectedUser);
    this.$target.innerHTML = `
      <span><strong>${this.store.selectedUser}</strong>'s Todo List</span>
    `;
  }
}
