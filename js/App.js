import Component from "./core/Component.js";
import $store from "./store/index.js";

import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoFilter from "./component/TodoFilter.js";

export default class App extends Component {
  init() {
    this.components = {
      "#user-title": UserTitle,
      "#user-list": UserList,
      "#todo-input": TodoInput,
      "#todo-list": TodoList,
      "#todo-filter": TodoFilter,
    };

    this.events = {
      click: [this.deleteAllTodo],
    };
  }

  async deleteAllTodo() {
    await $store.todo.deleteAll();
  }

  render() {
    return `
      <h1 id="user-title">
      </h1>
      <section>
        <div id="user-list">
        </div>
      </section>

      <section class="todoapp">
        <section id="todo-input" class="input-container">
        </section>
        <section id="todo-list" class="main">
        </section>
        <div class="count-container">
          <span class="todo-count">총 <strong>0</strong> 개</span>
          <ul id="todo-filter" class="filters">
          </ul>
          <button class="clear-completed" data-action="deleteAllTodo">모두 삭제</button>
        </div>
      </section>
    `;
  }
}
