import Component from "../core/Component.js";
import $store from "../store/index.js";

import { Constants } from "../utils/constants.js";

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
    <select class="chip select" data-action="selectPriority">
      <option value="NONE" selected>순위</option>
      <option value="FIRST">1순위</option>
      <option value="SECOND">2순위</option>
    </select>
  `;
};

const TodoListItemPriority = (priority) => {
  const { className, text } = Object.values(Constants).find(
    ({ value }) => value === priority
  );
  return `
    <span class="chip ${className}">${text}</span>
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
        <input 
          class="toggle" 
          type="checkbox" 
          ${isCompleted ? "checked" : ""}
          data-action="toggleTodo"
        />
        <label class="label" data-action="toggleEditingTodo">
          ${renderPriority(priority)}
          ${contents}
        </label>
        <button class="destroy" data-action="deleteTodo"></button>
      </div>
      <input class="edit" value="${contents}" />
    </li>
  `;
};

export default class TodoList extends Component {
  submitEditing;
  cancelEditingByKeyDown;
  cancelEditingByClick;
  editTarget;

  init() {
    this.events = {
      click: [this.deleteTodo, this.toggleTodo],
      dblclick: [this.toggleEditingTodo],
      change: [this.selectPriority],
    };

    $store.user.subscribe(this.setState.bind(this));
    $store.todo.subscribe(this.setState.bind(this));
    $store.filter.subscribe(this.setState.bind(this));
  }

  async deleteTodo({ target }) {
    const targetTodo = target.closest("li");
    await $store.todo.delete(targetTodo.dataset.id);
  }

  async toggleTodo({ target }) {
    const targetTodo = target.closest("li");
    await $store.todo.toggle(targetTodo.dataset.id);
  }

  async toggleEditingTodo({ target }) {
    this.editTarget = target.closest("li");
    this.editTarget.classList.add("editing");
    this.setEditingEvents();
  }

  setEditingEvents() {
    const editingInput = this.editTarget.querySelector(".edit");
    this.submitEditing = this.submitEditingTodo.bind(this);
    this.cancelEditingByKeyDown = this.cancelEditingTodoByKeyDown.bind(this);
    this.cancelEditingByClick = this.cancelEditingTodoByClick.bind(this);
    editingInput.addEventListener("keypress", this.submitEditing);
    editingInput.addEventListener("keydown", this.cancelEditingByKeyDown);
    window.addEventListener("click", this.cancelEditingByClick);
  }

  async submitEditingTodo({ target, key }) {
    if (key !== "Enter") {
      return;
    }

    this.removeEditingEvents();
    const todoId = this.editTarget.dataset.id;
    await $store.todo.edit(todoId, target.value);
  }

  cancelEditingTodoByKeyDown({ key }) {
    if (key !== "Escape") {
      return;
    }

    this.removeEditingEvents();
    this.editTarget.classList.remove("editing");
  }

  cancelEditingTodoByClick({ target }) {
    if (target.classList.contains("edit")) {
      return;
    }

    this.removeEditingEvents();
    this.editTarget.classList.remove("editing");
  }

  removeEditingEvents() {
    this.editTarget.removeEventListener("keypress", this.submitEditing);
    this.editTarget.removeEventListener("keydown", this.cancelEditingByKeyDown);
    window.removeEventListener("click", this.cancelEditingByClick);
  }

  async selectPriority({ target }) {
    const targetTodo = target.closest("li");
    const selected = Object.values(Constants).find(
      ({ value }) => value === target.value
    );

    await $store.todo.setPriority(targetTodo.dataset.id, selected.value);
  }

  async render() {
    this.dom.innerHTML = TodoListLoadingBar();
    const todos = await $store.todo.getFiltered();

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
