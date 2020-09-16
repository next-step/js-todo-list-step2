import {Component} from "../../core/Component.js";
import {userStore} from "../../store/userStore.js";

export const UserTitle = class extends Component {

  template () {
    return `
      <span><strong>${userStore.$getters.selectedUser?.name}</strong>'s Todo List</span>
    `;
  }

}
