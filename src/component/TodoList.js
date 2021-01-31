import { createElement } from "../utils/createElement.js";
import $store from "../store/index.js";

import TodoListItem from "./TodoListItem.js";

export default function TodoList() {
  const dom = createElement("<div></div>");

  const init = async () => {
    $store.todoState.subscribe(render);
    await render();
  };

  const render = async () => {
    const todos = await $store.todoState.getFilteredTodos();

    dom.innerHTML = "";
    todos.forEach(renderEachTodo);
  };

  const renderEachTodo = (todo) => {
    const $todoListItem = TodoListItem({ todo });
    dom.appendChild($todoListItem);
  };

  init();

  return dom;
}
