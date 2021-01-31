import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

import TodoListItem from "./TodoListItem.js";

const TodoListLoadingBar = `
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

export default function TodoList() {
  const dom = createElement("<div></div>");

  const init = async () => {
    $store.todoState.subscribe(render);
    await render();
  };

  const render = async () => {
    dom.innerHTML = TodoListLoadingBar;
    const todos = await $store.todoState.getFilteredTodos();

    dom.innerHTML = "";
    todos.forEach(renderEachTodo);
  };

  const renderEachTodo = (todo) => {
    const todoListItem = TodoListItem({ todo });
    dom.appendChild(todoListItem);
  };

  init();

  return dom;
}
