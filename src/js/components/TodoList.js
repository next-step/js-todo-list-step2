import { $ } from "../lib/util.js";

class TodoList {
  constructor({ onDelete, onComplete, onEditing, onEdit }) {
    this.onDelete = onDelete;
    this.onComplete = onComplete;
    this.onEditing = onEditing;
    this.onEdit = onEdit;
  }

  setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
    this.registerEventHandler();
  };

  render = (items) => {
    if (!items) return;
    const template = items.map((item) => {
      return `<li class=${item.completed ? "completed" : ""} ${item.editing ? "editing" : ""}> 
      <div class= "view">
        <input class="toggle" data-id=${item.id} type="checkbox" ${
        item.completed ? "checked" : ""
      }/>
        <label class="label" data-id=${item.id}>${item.contents}</label>
        <button data-id=${item.id} class="destroy"></button>
      </div>
      <input  data-id=${item.id} class="edit" value="${item.contents}" />
    </li>`;
    });

    $(".todo-list").innerHTML = template.join("");
  };

  registerEventHandler = () => {
    const deleteButtons = document.querySelectorAll(".destroy");
    const completeButtons = document.querySelectorAll(".toggle");
    const itemTitles = document.querySelectorAll(".label");
    const editInputs = document.querySelectorAll(".edit");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.onDelete(e.target.dataset.id));
    });

    completeButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.onComplete(e.target.dataset.id));
    });

    itemTitles.forEach((title) => {
      title.addEventListener("dblclick", (e) => this.onEditing(e.target.dataset.id));
    });

    editInputs.forEach((input) => {
      input.addEventListener("keydown", (e) => this.onEdit(e, e.target.dataset.id));
    });
  };
}

export default TodoList;
