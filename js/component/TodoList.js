import Component from "../core/Component.js";
import $store from "../store/index.js";

const TodoListLoadingBar = () => {
  return `
    <ul class="todo-list">
      <li>
        <div class="view">
          <label class="label">
            <div class="animated-background">
              <div class="skel-mask-container">
                <div class="skel-mask"></div>
              </div>
            </div>
          </label>
        </div>
      </li>
    </ul>
  `;
};

const TodoListItemPrioritySelector = () => {
  return `
    <select class="chip select">
      <option value="0" selected>순위</option>
      <option value="1">1순위</option>
      <option value="2">2순위</option>
    </select>
  `;
};

const TodoListItemPriority = (priority) => {
  return `
    <span class="chip ${priority}">1순위</span>
  `;
};

function renderPriority(priority) {
  if (priority === "NONE") {
    return TodoListItemPrioritySelector();
  } else {
    return TodoListItemPriority(priority);
  }
}

const TodoListItem = ({ _id, contents, priority, isCompleted }) => {
  return `
    <li class="${isCompleted ? "completed" : ""}" data-id="${_id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}/>
        <label class="label">
          ${renderPriority(priority)}
          ${contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${contents}" />
    </li>
  `;
};

export default class TodoList extends Component {
  submitEditingEvent;
  cancelEditingEvent;

  init() {
    this.events = {
      click: [this.deleteTodo, this.toggleTodo],
      dblclick: [this.toggleEditingTodo],
    };

    $store.user.subscribe(this.setState.bind(this));
    $store.todo.subscribe(this.setState.bind(this));
  }

  async deleteTodo({ target }) {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const targetTodo = target.closest("li");
    await $store.todo.delete(targetTodo.dataset.id);
  }

  async toggleTodo({ target }) {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const targetTodo = target.closest("li");
    await $store.todo.toggle(targetTodo.dataset.id);
  }

  async toggleEditingTodo({ target }) {
    if (!target.classList.contains("label")) {
      return;
    }

    const targetTodo = target.closest("li");
    targetTodo.classList.add("editing");

    const editingInput = targetTodo.querySelector(".edit");
    this.submitEditingEvent = this.submitEditingTodo.bind(this);
    this.cancelEditingEvent = this.cancelEditingTodo.bind(this);
    editingInput.addEventListener("keypress", this.submitEditingEvent);
    editingInput.addEventListener("keydown", this.cancelEditingEvent);
  }

  async submitEditingTodo({ target, key }) {
    if (key !== "Enter") {
      return;
    }
    target.removeEventListener("keypress", this.submitEditingEvent);
    target.removeEventListener("keydown", this.cancelEditingEvent);
    const targetTodo = target.closest("li");
    await $store.todo.edit(targetTodo.dataset.id, target.value);
  }

  cancelEditingTodo({ target, key }) {
    if (key !== "Escape") {
      return;
    }
    target.removeEventListener("keypress", this.submitEditingEvent);
    target.removeEventListener("keydown", this.cancelEditingEvent);
    const targetTodo = target.closest("li");
    targetTodo.classList.remove("editing");
  }

  async render() {
    this.dom.innerHTML = TodoListLoadingBar();
    const todos = await $store.todo.getAll();

    if (!Array.isArray(todos)) {
      return TodoListLoadingBar();
    }

    return `
      <ul class="todo-list">
        ${todos.map(TodoListItem).join("")}
      </ul>
    `;
  }
}
