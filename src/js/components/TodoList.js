import { $, $$ } from "../lib/util.js";

class TodoList {
  constructor({ onDelete, onComplete, onEditing, onEdit, onSetPriority }) {
    this.onDelete = onDelete;
    this.onComplete = onComplete;
    this.onEditing = onEditing;
    this.onEdit = onEdit;
    this.onSetPriority = onSetPriority;
  }

  setState = (updatedTodoItems) => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
    this.registerEventHandler();
  };

  render = (items) => {
    if (!items) return;
    const template = items.map((item) => {
      return `<li class=${item.isCompleted ? "completed" : ""} ${item.editing ? "editing" : ""}> 
      <div class= "view">
        <input class="toggle" data-id=${item.id} type="checkbox" ${
        item.isCompleted ? "checked" : ""
      }/>
        <label class="label" data-id=${item.id}>
        ${
          item.priority === "NONE"
            ? `<select class="chip select" data-id=${item.id}> 
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>`
            : ` <span class="chip ${item.priority === "FIRST" ? "primary" : "secondary"}">${
                item.priority === "FIRST" ? 1 : 2
              }순위</span>`
        }
        ${item.contents}</label>
        <button data-id=${item.id} class="destroy"></button>
      </div>
      <input  data-id=${item.id} class="edit" value="${item.contents}" />
    </li>`;
    });

    $(".todo-list").innerHTML = template.join("");
  };

  registerEventHandler = () => {
    $$(".destroy").forEach((button) => {
      button.addEventListener("click", (e) => this.onDelete(e.target.dataset.id));
    });

    $$(".toggle").forEach((button) => {
      button.addEventListener("click", (e) => this.onComplete(e.target.dataset.id));
    });

    $$(".label").forEach((title) => {
      title.addEventListener("dblclick", (e) => this.onEditing(e.target.dataset.id));
    });

    $$(".edit").forEach((input) => {
      input.addEventListener("keydown", (e) => this.onEdit(e, e.target.dataset.id));
    });

    $$(".select").forEach((select) => {
      select.addEventListener("click", (e) => {
        this.onSetPriority(e, e.target.dataset.id);
      });
    });
  };
}

export default TodoList;
