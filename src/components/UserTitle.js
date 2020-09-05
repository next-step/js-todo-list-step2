import { Component } from "../core/Component.js";
import { userStore } from "../store/userStore.js";

export const UserTitle = class extends Component {

  render () {
    const title = userStore.$getters.selectedUser;
    return `
      <span><strong>${title}</strong>'s Todo List</span>
    `;
  }

}