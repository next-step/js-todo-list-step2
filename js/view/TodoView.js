import {
  todoFilterTemplate,
  todoItemTemplate,
  todoUserCreateTemplate,
  todoUserTemplate,
} from "/js/utils/templates.js";
import { $todoItemStore } from "/js/store/TodoStore.js";
import { $store } from "/js/store/MemberStore.js";

function TodoView() {
  const $userList = document.querySelector("#user-list");
  const $itemList = document.querySelector(".todo-list");
  const $countContainer = document.querySelector(".count-container");

  this.render = () => {
    this.userRender();
    this.itemRender();
  };

  this.userRender = () => {
    const members = $store.getMembers();
    const nowMemberId = $store.getNowMemberId();
    console.log("nowMemberId: " + nowMemberId);
    $userList.innerHTML = members
      .map((member) => todoUserTemplate(member, nowMemberId))
      .join("");
    $userList.insertAdjacentHTML("beforeend", todoUserCreateTemplate);
  };

  this.itemRender = () => {
    const items = $store.getItems();
    $itemList.innerHTML = items.map(todoItemTemplate).join("");
    $countContainer.innerHTML = todoFilterTemplate({
      count: items.length,
      filter: $todoItemStore.filterState,
    });
  };
}

export const todoView = new TodoView();
