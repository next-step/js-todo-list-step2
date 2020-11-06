import { TodoStore } from "../stores/index.js";
import Event from "../utils/event.js";
import { TARGETS, MESSAGES } from "../../shared/utils/constants.js";
import { filterViewTypeTodos } from "../utils/validator.js";

class TodoList {
  constructor({ $target, setGlobalState, todoCount }) {
    this.$target = $target;
    this.state = TodoStore.getStore;
    this.toggleCompleted = Event.toggleCompleted;
    this.deleteTodo = Event.deleteTodo;
    this.deleteAllTodos = Event.deleteAllTodos;
    this.editingTodo = Event.editingTodo;
    this.saveEditContents = Event.saveEditContents;
    this.editPriority = Event.editPriority;
    this.setGlobalState = setGlobalState;
    this.todoCount = todoCount;

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

    document
      .querySelector(TARGETS.TODO_DELETE_ALL_BUTTON)
      .addEventListener("click", this.onClickDeleteAllTodos);

    document
      .querySelector(TARGETS.TODO_FILTER)
      .addEventListener("click", this.onClickFilterTodos);

    this.$target.innerHTML = this.skeletonMask().join("");
  }

  onClickFilterTodos = async e => {
    if (e.target.nodeName !== "A") return;

    e.target
      .closest(TARGETS.TODO_FILTER)
      .querySelector(".selected")
      .classList.remove("selected");

    e.target.classList.add("selected");

    TodoStore.setState({
      ...TodoStore.getStore,
      viewType: e.target.dataset.type
    });

    this.setState(TodoStore.getStore);
    this.todoCount.setState(TodoStore.getStore);
  };

  onClickDeleteAllTodos = async () => {
    if (confirm(MESSAGES.DELETE_USER_CONFIRM)) {
      await this.deleteAllTodos();
      this.setGlobalState();
    }
  };

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

  skeletonMask() {
    return Array(3).fill(`<li>
    <div class="view">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
  </li>`);
  }

  setState(payload) {
    this.state = { ...this.state, ...payload };
    this.render();
  }

  render() {
    let filterTodos = this.state.todos;
    if (this.state.viewType === "completed") {
      filterTodos = filterViewTypeTodos(this.state.todos, true);
    } else if (this.state.viewType === "active") {
      filterTodos = filterViewTypeTodos(this.state.todos, false);
    }

    const todos = filterTodos.map(todo => {
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
