import Component from "../core/Component.js";
import $store from "../store/index.js";

export default class UserTitle extends Component {
  init() {
    $store.user.subscribe(this.setState.bind(this));
  }

  async render() {
    const name = await $store.user.getSelectedName();

    return `
      <span><strong>${name}</strong>'s Todo List</span>
    `;
  }
}
