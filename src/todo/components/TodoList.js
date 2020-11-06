import { TodoStore } from "../stores/index.js";
import Event from "../utils/event.js";
import { TARGETS, TODO_PRIORITY } from "../../shared/utils/constants.js";

class TodoList {
  constructor({ $target, setGlobalState }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
    this.toggleCompleted = Event.toggleCompleted;
    this.deleteTodo = Event.deleteTodo;
    this.editingTodo = Event.editingTodo;
    this.saveEditContents = Event.saveEditContents;
    this.editPriority = Event.editPriority;
    this.setGlobalState = setGlobalState;

    this.render();

    document
      .querySelector(TARGETS.TODO_LIST)
      .addEventListener("click", this.onToggleCompleted);

    document
      .querySelector(TARGETS.TODO_LIST)
      .addEventListener("dblclick", this.onChangeContents);

    document
      .querySelector(TARGETS.TODO_LIST)
      .addEventListener("change", this.onChangePriority);

    document.addEventListener("keydown", this.onKeydown);
  }

  onKeydown = async e => {
    if (e.target.classList.contains("edit")) {
      if (e.key === "Enter" && e.target.nodeName === "INPUT") {
        const { activeUser } = TodoStore.getStore;
        await this.saveEditContents({
          _id: activeUser,
          itemId: e.target.closest("li").dataset.id,
          contents: e.target.value
        });
        this.setGlobalState();
      }
    }

    if (e.key === "Escape" && document.querySelector(".editing")) {
      this.editingTodo({
        itemId: document.querySelector(".editing").dataset.id,
        type: false
      });
      this.setGlobalState();
    }
  };

  onChangePriority = async e => {
    if (e.target.nodeName !== "SELECT") return;

    const { activeUser } = TodoStore.getStore;
    await this.editPriority({
      _id: activeUser,
      itemId: e.target.closest("li").dataset.id,
      priority: e.target.value
    });

    this.setGlobalState();
  };

  onChangeContents = async e => {
    if (e.target.nodeName !== "LABEL") return;

    this.editingTodo({
      itemId: e.target.closest("li").dataset.id,
      type: true
    });
    this.setGlobalState();
  };

  onToggleCompleted = async e => {
    const { activeUser } = TodoStore.getStore;

    switch (e.target.nodeName) {
      case "INPUT":
        if (!e.target.classList.contains("edit")) {
          await this.toggleCompleted({
            _id: activeUser,
            itemId: e.target.closest("li").dataset.id
          });
          this.setGlobalState();
        }
        break;
      case "BUTTON":
        await this.deleteTodo({
          _id: activeUser,
          itemId: e.target.closest("li").dataset.id
        });
        this.setGlobalState();
        break;

      default:
        break;
    }
  };

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    const todos = this.state.todos.map(todo => {
      let priority = 0;
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
      <li data-id=${todo._id} class="${todo.isCompleted ? "completed" : ""} ${
        todo.isEditing ? "editing" : ""
      }">
        <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.isCompleted && `checked="true"`
          } />
          <label class="label">
            <select class="chip select-${priority}">
              <option value="NONE" ${
                todo.priority === "NONE" ? "selected" : ""
              }>순위</option>
              <option value="FIRST" ${
                todo.priority === "FIRST" ? "selected" : ""
              }>1순위</option>
              <option value="SECOND" ${
                todo.priority === "SECOND" ? "selected" : ""
              }>2순위</option>
            </select>
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
