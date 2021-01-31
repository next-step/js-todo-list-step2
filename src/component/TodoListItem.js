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

  const init = () => {
    toggleBtn.addEventListener("click", onToggleTodo);
  };

  const onToggleTodo = async () => {
    dom.classList.toggle("completed");
    await $store.todoState.toggleTodo(todo._id);
  };

  init();

  return dom;
}
