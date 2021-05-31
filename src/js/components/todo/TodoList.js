import { todoItem, loading } from "./todoItem.js";
export default class TodoList {
  constructor({
    todoData,
    onCheckItem,
    onEditItem,
    onSetPriorityItem,
    onDeleteItem,
  }) {
    this.todoListUl = document.getElementById("todo-list");
    this.todoPrioritySelect = document.querySelector("select.chip");
    this.todoData = todoData;
    this.handleCheckItem = onCheckItem;
    this.handleEditItem = onEditItem;
    this.handleSetPriorityItem = onSetPriorityItem;
    this.handleDeleteItem = onDeleteItem;

    this.init();
  }

  setState(data) {
    this.todoData = data;
    this.todoListUl.innerHTML = "";
    this.render();
  }

  init() {
    this.todoListUl.addEventListener("click", ({ target }) =>
      this.todoClickHandler(target)
    );

    this.todoListUl.addEventListener("dblclick", ({ target }) =>
      this.todoDblclickHandler(target)
    );

    this.todoListUl.addEventListener("change", ({ target }) =>
      this.todoChangeHandler(target)
    );
  }

  todoClickHandler(target) {
    const parentId = target.closest("li").id;
    if (target.classList.contains("toggle")) this.handleCheckItem(parentId);
    if (target.classList.contains("destroy")) this.handleDeleteItem(parentId);
  }

  todoDblclickHandler(target) {
    if (!target.classList.contains("label")) return;
    const parentLi = target.closest("li");
    const editingEls = document.querySelectorAll("li.editing");
    editingEls.forEach((li) => li.classList.remove("editing"));
    parentLi.classList.add("editing");

    const editInput = parentLi.querySelector("input.edit");
    editInput.focus();
    editInput.onkeydown = ({ keyCode, target }) =>
      this.editInputKeydownHandler({ keyCode, target }, parentLi);
  }

  todoChangeHandler(target) {
    if (target.value === 0) return;
    const parentId = target.closest("li").id;
    this.handleSetPriorityItem(
      parentId,
      target.value === "1" ? "FIRST" : "SECOND"
    );
  }

  editInputKeydownHandler({ keyCode, target }, parentLi) {
    if (keyCode === 13) {
      const title = target.value.trim();
      const parentId = target.closest("li").id;
      if (title.length < 2) {
        alert("TodoItem의 콘텐츠는 최소 2글자 이상이어야 합니다.");
        return;
      }
      this.handleEditItem(parentId, title);
    } else if (keyCode === 27) {
      parentLi.classList.remove("editing");
    }
  }

  isLoading() {
    this.todoListUl.innerHTML = loading();
  }

  render() {
    if (!this.todoData) return;
    this.todoListUl.innerHTML = this.todoData
      .map((data) => todoItem(data))
      .join("");
  }
}
