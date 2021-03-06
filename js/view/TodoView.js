import {
  todoFilterTemplate,
  todoItemTemplate,
  todoUserCreateTemplate,
  todoUserTemplate,
} from "/js/utils/templates.js";
import { $todoItemStore } from "/js/store/TodoStore.js";
import { $userStore } from "/js/store/UserStore.js";

function TodoView() {
  const $userList = document.querySelector("#user-list");
  const $itemList = document.querySelector(".todo-list");
  const $countContainer = document.querySelector(".count-container");

  this.render = () => {
    this.itemRender($todoItemStore.getItemsByFilter());
    this.userRender($userStore);
  };

  this.itemRender = (items) => {
    $itemList.innerHTML = items.map(todoItemTemplate).join("");
    $countContainer.innerHTML = todoFilterTemplate({
      count: items.length,
      filter: $todoItemStore.filterState,
    });
  };

  this.userRender = (userStore) => {
    const users = userStore.getAllUsers();
    const nowUserName = userStore.getNowUserName();
    $userList.innerHTML = users
      .map((user) => todoUserTemplate(user, nowUserName))
      .join("");
    $userList.insertAdjacentHTML("beforeend", todoUserCreateTemplate);
  };
}

export const todoView = new TodoView();
