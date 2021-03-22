import Component from "../core/Component.js";
import $store from "../store/index.js";

export default class TodoCount extends Component {
  init() {
    $store.user.subscribe(this.setState.bind(this));
    $store.todo.subscribe(this.setState.bind(this));
    $store.filter.subscribe(this.setState.bind(this));
  }

  async render() {
    const todos = await $store.todo.getFiltered();
    return `
      <span class="todo-count">총 <strong>${todos.length}</strong> 개</span>
    `;
  }
}
