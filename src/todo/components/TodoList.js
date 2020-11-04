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
      let priority = 1;
      switch (todo.priority) {
        case "FIRST":
          priority = 1;
          break;
        case "SECOND":
          priority = 2;
          break;
        default:
          break;
      }

      return `
      <li id=${todo._id} class="${todo.isCompleted ? "completed" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox" checked=${todo.isCompleted} />
          ${
            todo.priority !== "NONE"
              ? `<label class="label">
          <span class="chip ${
            TODO_PRIORITY[todo.priority]
              ? TODO_PRIORITY[todo.priority]
              : "primary"
          }">${priority}순위</span>
            ${todo.contents}
          </label>`
              : `<label class="label">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
              해야할 아이템
            </label>`
          }
          
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
