import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

import { PRIORITY } from "../utils/constants.js";

const todoListItemPrioritySelector = `
  <select class="chip select">
    <option value="NONE" selected>순위</option>
    <option value="FIRST">1순위</option>
    <option value="SECOND">2순위</option>
  </select>
`;

const todoListItemPriority = (priority) => {
  const { className, text } = Object.values(PRIORITY).find(
    ({ value }) => value === priority
  );
  return `
      <span class="chip ${className}">${text}</span>
    `;
};

const todoPriority = (priority) =>
  priority === "NONE"
    ? todoListItemPrioritySelector
    : todoListItemPriority(priority);

const template = ({ priority, contents, isCompleted }) => `
  <li class="${isCompleted ? "completed" : ""}"">
    <div class="view">
      <input 
        class="toggle" 
        type="checkbox" 
        ${isCompleted ? "checked" : ""}
      />
      <label class="label">
        ${todoPriority(priority)}
        ${contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${contents}" />
  </li>
`;

export default function TodoListItem({ todo }) {
  const dom = createElement(template(todo));
  const toggleBtn = dom.querySelector(".toggle");
  const deleteBtn = dom.querySelector(".destroy");
  const label = dom.querySelector(".label");
  const editInput = dom.querySelector(".edit");
  const prioritySelector = dom.querySelector(".select");

  const init = () => {
    toggleBtn.addEventListener("click", onToggleTodo);
    deleteBtn.addEventListener("click", onDeleteTodo);
    label.addEventListener("dblclick", onToggleEditingTodo);
    editInput.addEventListener("keypress", onEditTodo);
    editInput.addEventListener("focusout", onCancelEditingTodo);
    prioritySelector?.addEventListener("change", onSelectPriority);
  };

  const onToggleTodo = async () => {
    dom.classList.toggle("completed");
    await $store.todoState.toggleTodo(todo._id);
  };

  const onDeleteTodo = async () => {
    dom.remove();
    await $store.todoState.deleteTodo(todo._id);
  };

  const onToggleEditingTodo = () => {
    const editingItem = document.querySelector(".editing");
    editingItem?.classList.remove("editing");

    dom.classList.add("editing");
  };

  const onEditTodo = async ({ key, target }) => {
    if (key !== "Enter") {
      return;
    }

    const contents = target.value.trim();
    if (contents === "") {
      return;
    }

    label.innerText = contents;
    dom.classList.remove("editing");

    await $store.todoState.editTodo(todo._id, contents);
  };

  const onCancelEditingTodo = () => {
    editInput.value = todo.contents;
    dom.classList.remove("editing");
  };

  const onSelectPriority = async () => {
    const selected = Object.values(PRIORITY).find(
      ({ value }) => value === prioritySelector.value
    );

    await $store.todoState.setPriority(todo._id, selected.value);
  };

  init();

  return dom;
}
