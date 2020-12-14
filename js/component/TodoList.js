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

const TodoListItem = ({ _id, contents, priority, isCompleted, isEditing }) => {
  const classList = [isCompleted ? "completed" : "", isEditing ? "editing" : ""]
    .join(" ")
    .trim();

  return `
    <li class="${classList}" data-id="${_id}">
      <div class="view">
        <input class="toggle" type="checkbox" />
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
  init() {
    this.events = {
      click: [this.deleteTodo, this.toggleTodo],
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
