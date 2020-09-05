import { Component } from "../core/Component.js";
import { SET_USER, userStore } from "../store/userStore.js";
import { FETCH_ITEMS, SET_LOADING_TYPE, todoStore } from "../store/todoStore.js";
import LoadingTypes from "../constants/LoadingTypes.js";
import { lazyFrame } from "../utils/index.js";

export const UserList = class extends Component {

  async #loadItemsByUser (index) {
    userStore.commit(SET_USER, index);
    todoStore.commit(SET_LOADING_TYPE, LoadingTypes.INIT);
    await Promise.all([
      todoStore.dispatch(FETCH_ITEMS, userStore.$getters.selectedUserName),
      lazyFrame(),
    ])
    todoStore.commit(SET_LOADING_TYPE, LoadingTypes.LOADED);
  }

  render () {
    const { users, selectedIndex } = userStore.$state;
    return users.map(({ name }, index) => `
      <button class="ripple ${index === selectedIndex ? 'active' : ''}" data-index="${index}">${name}</button>
    `).join('');
  }

  setEvent (componentTarget) {
    componentTarget.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('ripple')) return;
      this.#loadItemsByUser(Number(target.dataset.index));
    })
  }
}