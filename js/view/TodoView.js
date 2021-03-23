import {
  todoFilterTemplate,
  todoItemTemplate,
  todoUserCreateDeleteTemplate,
  todoUserTemplate,
} from "/js/utils/templates.js";
import { $store } from "/js/store/index.js";
import { TodoPriorityController } from "/js/controller/TodoPrirorityController.js";

function TodoView() {
  const $userList = document.querySelector("#user-list");
  const $itemList = document.querySelector(".todo-list");
  const $countContainer = document.querySelector(".count-container");

  this.render = () => {
    this.userRender();
    this.itemRender();
  };

  this.userRender = () => {
    const members = $store.member.getMembers();
    const nowMember = $store.member.getNowMember();
    $userList.innerHTML = members
      .map((member) => todoUserTemplate(member, nowMember))
      .join("");
    $userList.insertAdjacentHTML("beforeend", todoUserCreateDeleteTemplate);
  };

  this.itemRender = () => {
    const items = $store.todoItem.getItemsByFilter();
    $itemList.innerHTML = items.map(todoItemTemplate).join("");
    $countContainer.innerHTML = todoFilterTemplate({
      count: items.length,
      filter: $store.todoItem.filterState,
    });
    addPriorityEvent();
  };

  const addPriorityEvent = () => {
    const todoPriorityController = new TodoPriorityController();
    todoPriorityController.init();
  };
}

export const todoView = new TodoView();
