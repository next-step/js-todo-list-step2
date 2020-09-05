import { Component } from "../core/Component.js";
import { userStore } from "../store/userStore.js";

export const UserList = class extends Component {

  render () {
    const { users, selectedIndex } = userStore.$state;
    return users.map(({ _id, name }, index) => `
      <button class="ripple ${index === selectedIndex}" data-id="${_id}">${name}</button>
    `).join('');
  }

  setEvent (componentTarget) {
    componentTarget.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('ripple')) return;

    })
  }
}