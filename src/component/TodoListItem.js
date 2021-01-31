import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

const template = ({ contents, isCompleted }) => `
  <li class="${isCompleted ? "completed" : ""}"">
    <div class="view">
      <input 
        class="toggle" 
        type="checkbox" 
        ${isCompleted ? "checked" : ""}
      />
      <label class="label">
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

  const init = () => {
    toggleBtn.addEventListener("click", onToggleTodo);
    deleteBtn.addEventListener("click", onDeleteTodo);
    label.addEventListener("dblclick", onToggleEditingTodo);
    editInput.addEventListener("keypress", onEditTodo);
    editInput.addEventListener("focusout", onCancelEditingTodo);
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

  init();

  return dom;
}
