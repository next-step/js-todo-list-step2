import Component from "../core/Component.js";
import $store from "../store/index.js";

export default class TodoInput extends Component {
  init() {
    this.events = {
      keypress: [this.createTodo],
    };
  }

  async createTodo({ key, target }) {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value;
    if (contents.trim().length < 2) {
      alert("2글자 이상이어야 합니다.");
      return;
    }

    await $store.todo.create(contents);
    target.value = "";
  }

  render() {
    return `
      <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus
      />
    `;
  }
}
