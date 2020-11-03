import { TODO_PRIORITY } from "../../shared/utils/constants.js";

class TodoList {
  constructor({ $target, todos }) {
    this.$target = $target;
    this.state = { todos };

    this.render();
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return `
      <li id=${todo._id} class="${todo.isCompleted ? "completed" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox" checked=${todo.isCompleted} />
          <label class="label">
            <span class="chip ${TODO_PRIORITY[todo.priority].name}">${
        todo.priority
      }순위</span>
            ${todo.contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${todo.contents} />
      </li>
      `;
    });

    this.$target.innerHTML = todos.join("");
  }
}

export default TodoList;
