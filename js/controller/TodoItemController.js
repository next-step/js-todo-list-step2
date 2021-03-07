import { todoItemService } from "/js/service/TodoItemService.js";

function TodoItemController() {
  this.todoItemService = todoItemService;

  const $todoList = document.querySelector(".todo-list");

  const onClickTodoList = ({ target }) => {
    const $todoItem = findItem(target);
    if (isToggleButton(target)) {
      this.todoItemService.toggle($todoItem);
      return;
    }
    if (isDestroyButton(target)) {
      this.todoItemService.destroy($todoItem);
    }
  };

  function findItem(target) {
    return target.closest(".todo-item");
  }

  function isToggleButton(target) {
    return target.classList.contains("toggle");
  }

  function isDestroyButton(target) {
    return target.classList.contains("destroy");
  }

  const onDoubleClickTodoList = ({ target }) => {
    if (isToggleButton(target)) {
      return;
    }

    const $todoItem = findItem(target);
    if (isNotComplete(target)) {
      this.todoItemService.onEdit($todoItem);
    }
  };

  function isNotComplete(target) {
    const $todoItem = findItem(target);
    return !$todoItem.classList.contains("completed");
  }

  const onKeyupTodoList = (event) => {
    if (event.key === "Enter") {
      edit(event);
      return;
    }

    if (event.key === "Escape") {
      offEdit(event);
    }
  };

  const edit = (event) => {
    const $todoItem = event.target.closest(".todo-item");
    const contents = event.target.value;
    this.todoItemService.edit($todoItem.dataset.id, contents);
  };

  const offEdit = (event) => {
    const $todoItem = event.target.closest(".todo-item");
    $todoItem.classList.remove("editing");
  };

  this.init = function () {
    $todoList.addEventListener("click", onClickTodoList);
    $todoList.addEventListener("dblclick", onDoubleClickTodoList);
    $todoList.addEventListener("keyup", onKeyupTodoList);
  };
}

export const todoItemController = new TodoItemController();
