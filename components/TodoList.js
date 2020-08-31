import { TOGGLE, EDIT, EDITING, ESC, ENTER } from "../utils/data.js";
import { errorCallTemplate, todoListTemplate } from "../utils/template.js";

export default function TodoList({
  todoList,
  elementId,
  deleteTodo,
  toggleTodo,
  editTodo,
  setPriority,
}) {
  this.init = () => {
    if (!(this instanceof TodoList)) {
      throw new Error(errorCallTemplate);
    }
    this.state = {
      todoList: todoList,
    };
    this.$todoList = document.querySelector(`.${elementId}`);
    this.deleteTodo = deleteTodo;
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
    this.setPriority = setPriority;
  };
  this.render = () => {
    this.$todoList.innerHTML = todoListTemplate(this.state.todoList);
  };
  this.setState = (todoList) => {
    this.state.todoList = todoList;
    this.render();
  };
  this.clickHandler = (evt) => {
    if (
      evt.target.tagName === "INPUT" &&
      evt.target.classList.contains(TOGGLE)
    ) {
      this.toggleTodo({ id: evt.target.closest("li").dataset.id });
    }
    if (evt.target.tagName === "BUTTON") {
      this.deleteTodo({ id: evt.target.closest("li").dataset.id });
    }
  };
  this.dblClickHandler = (evt) => {
    if (evt.target.tagName === "LABEL") {
      evt.target.closest("li").classList.toggle(EDITING);
      evt.target.closest("li").querySelector("input").focus();
      const input = evt.target.closest("li").querySelector("input.edit");
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };
  this.keydownHandler = (evt) => {
    if (
      evt.target.tagName === "INPUT" &&
      evt.target.classList.contains(EDIT) &&
      evt.key === ESC
    ) {
      evt.target.parentNode.classList.toggle(EDITING);
    } else if (evt.target.tagName === "INPUT" && evt.key === ENTER) {
      this.editTodo({
        contents: evt.target.value,
        _id: evt.target.parentNode.dataset.id,
      });
    }
  };
  this.changeHandler = (evt) => {
    if (evt.target.tagName === "SELECT") {
      const priority = evt.target.value;
      this.setPriority({ _id: evt.target.closest("li").dataset.id, priority });
    }
  };
  this.bindEventListener = () => {
    this.$todoList.addEventListener("click", this.clickHandler);
    this.$todoList.addEventListener("dblclick", this.dblClickHandler);
    this.$todoList.addEventListener("keydown", this.keydownHandler);
    this.$todoList.addEventListener("keydown", this.enterHandler);
    this.$todoList.addEventListener("change", this.changeHandler);
  };
  this.init();
  this.render();
  this.bindEventListener();
}
