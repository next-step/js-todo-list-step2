import { Component } from "../../core/Component.js";
import { ADD_ITEM, todoStore } from "../../store/todoStore.js";
import { userStore } from "../../store/userStore.js";

export const TodoAppender = class extends Component {

  get #user () {
    return userStore.$getters.selectedUser?._id;
  }

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
    this.addEvent('keypress', 'append', target => {
      todoStore.dispatch(ADD_ITEM, {
        user: this.#user,
        contents: target.value
      });
      target.value = '';
    })
  }
}