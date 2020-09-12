import { Component } from "../core/Component.js";
import { SET_USER, userStore } from "../store/userStore.js";
import { FETCH_ITEMS, SET_LOADING_TYPE, todoStore } from "../store/todoStore.js";
import LoadingTypes from "../constants/LoadingTypes.js";
import { lazyFrame } from "../utils/index.js";

export const UserList = class extends Component {

  template () {
    const { users, selectedIndex } = userStore.$state;
    return `
      ${users.map(({ name }, index) => `
        <button
          data-ref="select"
          data-index="${index}"
          class="ripple ${index === selectedIndex ? 'active' : ''}">
          ${name}
        </button>
      `).join('')}
      <button class="ripple user-create-button">+ 유저 생성</button>
    `;
  }

  setEvent () {
    this.addEvent('click', 'select', ({ target }) => {
      this.#loadItemsByUser(Number(target.dataset.index));
    })
  }
}