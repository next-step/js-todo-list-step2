import { TodoStore } from "../stores/index.js";
import Event from "../utils/event.js";
import { TARGETS, TODO_PRIORITY } from "../../shared/utils/constants.js";

class TodoList {
  constructor({ $target }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
    this.toggleCompleted = Event.toggleCompleted;

    this.render();

    document
      .querySelector(TARGETS.TODO_LIST)
      .addEventListener("click", this.onToggleCompleted);
  }

  onToggleCompleted = e => {
    if (e.target.nodeName !== "INPUT") return;

    this.toggleCompleted({
      _id: e.target.closest("li").dataset.id,
      isCompleted: e.target.checked
    });

    this.setState(TodoStore.getStore);
  };

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
      <li data-id=${todo._id} class="${todo.isCompleted ? "completed" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.isCompleted && `checked="true"`
          } />
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
