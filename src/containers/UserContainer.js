import {Component} from "../core/Component.js";
import TodoService from "../services/TodoService.js";

export const UserContainer = class extends Component {

  async init () {
    this.$state = {
      selectedIndex: 0,
      users: await TodoService.fetchUsers()
    }
  }

  get #selectedUser () {
    const { selectedIndex, users } = this.$state;
    return users[selectedIndex];
  }

  render () {
    const { users, selectedIndex } = this.$state;
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>${this.#selectedUser.name}</strong>'s Todo List</span>
      </h1>
      <section>
        <div id="user-list">
          ${users.map(({ name }, index) => `
            <button class="ripple ${index === selectedIndex ? 'active' : ''}">${name}</button>
          `).join('')}
          <button class="ripple user-create-button">+ 유저 생성</button>
        </div>
      </section>
    `;
  }

}