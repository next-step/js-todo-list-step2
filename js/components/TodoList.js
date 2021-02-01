import { Todo } from "../apis.js";

const renderSkelMask = () => `
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
`;

const renderTodoItem = (
  { _id, contents, isCompleted, priority },
  editingId
) => {
  const chipClasses = ["", "primary", "secondary"];
  const priorityIndex = Todo.priorities.findIndex((p) => p === priority);
  const optionsDOMString = Todo.priorities
    .map(
      (_priority, index) =>
        `<option value="${index}" ${_priority === priority ? "selected" : ""}>${
          index || ""
        }순위</option>`
    )
    .join("");

  return `
  <li class="${
    _id === editingId ? "editing" : isCompleted ? "completed" : ""
  }" data-id="${_id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${isCompleted ? "checked" : ""}>
      <label class="label">
        <select class="chip select ${chipClasses[priorityIndex] ?? ""}">
          ${optionsDOMString}
        </select>
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}">
  </li>
`;
};

export default function TodoList(listEl, todoApp) {
  const getTodoItemId = (childEl) => childEl.closest("li")?.dataset?.id;

  this.toggleIsCompleted = ({ target }) => {
    if (!target.classList.contains("toggle")) {
      return;
    }

    const id = getTodoItemId(target);
    const todo = todoApp.getTodo(id);
    todoApp.toggleIsComplete(todo);
  };

  this.deleteTodo = ({ target }) => {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const id = getTodoItemId(target);
    const { contents } = todoApp.getTodo(id);
    if (!confirm(`정말로 삭제하시겠습니까?\n\n${contents}`)) {
      return;
    }

    todoApp.deleteTodo(id);
  };

  this.convertToEditor = ({ target }) => {
    if (!target.classList.contains("label")) {
      return;
    }

    const id = getTodoItemId(target);
    todoApp.setEditingId(id);
  };

  this.convertToViewer = () => todoApp.setEditingId();

  this.updateContents = ({ code, target }) => {
    if (code !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (!contents) {
      return;
    }

    const todo = todoApp.getTodo(todoApp.editingId);
    todoApp.updateContents({ ...todo, contents });
    this.convertToViewer();
  };

  this.convertToViewerWhenPressingEsc = ({ code }) => {
    if (code !== "Escape") {
      return;
    }

    this.convertToViewer();
  };

  this.updatePriority = ({ target }) => {
    if (!target.classList.contains("chip")) {
      return;
    }

    const id = getTodoItemId(target);
    todoApp.updatePriority(id, target.value);
  };

  this.render = (todos) => {
    listEl.innerHTML = `${
      todoApp.isLoading ? renderSkelMask() : ""
    }${todos.map((todo) => renderTodoItem(todo, todoApp.editingId)).join("")}`;

    if (!todoApp.editingId) {
      return;
    }

    listEl.querySelector(`li[data-id="${todoApp.editingId}"] .edit`)?.focus();
  };

  listEl.addEventListener("click", this.toggleIsCompleted);
  listEl.addEventListener("click", this.deleteTodo);
  listEl.addEventListener("dblclick", this.convertToEditor);
  listEl.addEventListener("focusout", this.convertToViewer);
  listEl.addEventListener("keypress", this.updateContents);
  listEl.addEventListener("keypress", this.convertToViewerWhenPressingEsc);
  listEl.addEventListener("change", this.updatePriority);
}
