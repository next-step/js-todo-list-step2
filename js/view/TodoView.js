import {
  todoFilterTemplate,
  todoItemTemplate,
  todoUserCreateTemplate,
  todoUserTemplate,
} from "/js/utils/templates.js";
import { $todoItemStore } from "/js/store/TodoStore.js";
import { $memberStore } from "/js/store/MemberStore.js";

function TodoView() {
  const $userList = document.querySelector("#user-list");
  const $itemList = document.querySelector(".todo-list");
  const $countContainer = document.querySelector(".count-container");

  this.render = () => {
    this.itemRender();
    this.userRender();
  };

  this.itemRender = () => {
    const items = $todoItemStore.getItemsByFilter();
    $itemList.innerHTML = items.map(todoItemTemplate).join("");
    $countContainer.innerHTML = todoFilterTemplate({
      count: items.length,
      filter: $todoItemStore.filterState,
    });
  };

  this.userRender = () => {
    const members = $memberStore.getAllMembers();
    console.log(members);
    const nowUserName = $memberStore.getNowMemberName();
    $userList.innerHTML = members
      .map((user) => todoUserTemplate(user, nowUserName))
      .join("");
    $userList.insertAdjacentHTML("beforeend", todoUserCreateTemplate);
  };
}

export const todoView = new TodoView();
