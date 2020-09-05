import { Component } from "../core/Component.js";
import { ADD_ITEM, todoStore } from "../store/todoStore.js";
import { userStore } from "../store/userStore.js";

export const TodoInput = class extends Component {

  get userName () {
    return userStore.$getters.selectedUser.name;
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
      if (!target.classList.contains("new-todo")) return;
      if (['Enter'].includes(key)) {
        const user = this.userName;
        const contents = target.value;
        todoStore.dispatch(ADD_ITEM, { user, contents });
      }
    })
  }
}