import { Component } from "../core/Component.js";
import { ADD_ITEM, todoStore } from "../store/todoStore.js";
import { userStore } from "../store/userStore.js";

export const TodoInput = class extends Component {

  get #user () {
    return userStore.$getters.selectedUserName;
  }

  render () {
    return `
      <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus />
    `
  }

  setEvent (componentTarget) {
    componentTarget.addEventListener('keypress', ({ key, target }) => {
      if (!target.classList.contains("new-todo")
          || key !== 'Enter'
          || target.value.length === 0) return;
      todoStore.dispatch(ADD_ITEM, {
        user: this.#user,
        contents: target.value
      });
      target.value = '';
    })
  }
}