import Component from "./core/Component.js";
import $store from "./store/index.js";

import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoFilter from "./component/TodoFilter.js";
import TodoCount from "./component/TodoCount.js";

export default class App extends Component {
  init() {
    this.components = {
      "user-title": UserTitle,
      "user-list": UserList,
      "todo-input": TodoInput,
      "todo-list": TodoList,
      "todo-filter": TodoFilter,
      "todo-count": TodoCount,
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
      <user-title></user-title>
      <user-list></user-list>

      <section class="todoapp">
        <todo-input></todo-input>
        <todo-list></todo-list>
        <div class="count-container">
          <todo-count></todo-count>
          <todo-filter></todo-filter>
          <button class="clear-completed" data-action="deleteAllTodo">모두 삭제</button>
        </div>
      </section>
    `;
  }
}
