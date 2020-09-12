import { Component } from "../../core/Component.js";
import { ADD_ITEM, todoStore } from "../../store/todoStore.js";
import { userStore } from "../../store/userStore.js";

export const TodoAppender = class extends Component {

  get #user () { return userStore.$getters.selectedUser?._id; }

  template () {
    return `
      <input
        data-ref="append"
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus />
    `
  }

  setEvent () {
    this.addEvent('keypress', 'append', ({ key, target }) => {
      if (key !== 'Enter') return;
      todoStore.dispatch(ADD_ITEM, {
        userId: this.#user,
        contents: target.value
      });
      target.value = '';
    })
  }
}