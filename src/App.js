import { createElement } from "./utils/createElement.js";
import $store from "./store/index.js";

import UserTitle from "./component/UserTitle.js";
import UserList from "./component/UserList.js";
import TodoInput from "./component/TodoInput.js";
import TodoList from "./component/TodoList.js";
import TodoCount from "./component/TodoCount.js";
import TodoFilter from "./component/TodoFilter.js";

const template = () => `
  <div>
    <h1 id="user-title"></h1>
    <section id="user-list"></section> 
    <section class="todoapp">
      <section class="input-container">
      </section>
      <section class="main">
        <ul class="todo-list">
        </ul>
      </section>
      <div class="count-container">
        <span class="todo-count"></span>
        <ul class="filters"></ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
    </section>
  </div>
`;

export default function App() {
  const dom = createElement(template());
  const userTitle = dom.querySelector("#user-title");
  const userList = dom.querySelector("#user-list");
  const todoInput = dom.querySelector(".input-container");
  const todoList = dom.querySelector(".todo-list");
  const todoCount = dom.querySelector(".todo-count");
  const todoFilter = dom.querySelector(".filters");
  const deleteAllBtn = dom.querySelector(".clear-completed");

  const init = () => {
    userTitle.appendChild(new UserTitle());
    userList.appendChild(new UserList());
    todoInput.appendChild(new TodoInput());
    todoList.appendChild(new TodoList());
    todoFilter.appendChild(new TodoFilter());
    todoCount.appendChild(new TodoCount());

    deleteAllBtn.addEventListener("click", onDeleteAllTodo);
  };

  const onDeleteAllTodo = async () => {
    await $store.todoState.deleteAllTodo();
  };

  init();

  return dom;
}
