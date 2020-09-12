import {Component} from "../core/Component.js";
import {TodoAppender} from "../components/Todo/TodoAppender.js";
import {TodoList} from "../components/Todo/TodoList.js";
import {TodoFooter} from "../components/Todo/TodoFooter.js";

export const TodoContainer = class extends Component {

  componentInit () {
    this.$children = {
      TodoAppender: { constructor: TodoAppender },
      TodoList: { constructor: TodoList },
      TodoFooter: { constructor: TodoFooter },
    }

  }

  template () {
    return `
      <section class="todoapp">
        <section data-component="TodoAppender" class="input-container"></section>
        <section class="main">
          <ul data-component="TodoList" class="todo-list"></ul>
        </section>
        <div data-component="TodoFooter" class="count-container"></div>
      </section>
    `;
  }
}