import { Component } from "../core/Component.js";

export const TodoInput = class extends Component {
  render () {
    return `
      <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus />
    `
  }
}