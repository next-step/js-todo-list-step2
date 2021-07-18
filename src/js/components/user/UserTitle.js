import Component from "../../core/Component.js";

export default class UserTitle extends Component {
  render() {
    this.$target.setAttribute("data-username", this.store.selectedUserName);
    this.$target.innerHTML = `
      <span><strong>${this.store.selectedUserName}</strong>'s Todo List</span>
    `;
  }
}
