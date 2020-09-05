import { Component } from "../core/Component.js";
import { userStore } from "../store/userStore.js";

export const UserTitle = class extends Component {

  render () {
    return `
      <span><strong>${userStore.$getters.selectedUserName}</strong>'s Todo List</span>
    `;
  }

}