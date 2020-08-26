import { isFunction, validateTodoItems, validateInstance } from "../utils.js";
import { ESC_KEY } from "../constants.js";

function TodoList($target, todoItems, eventHandler) {
  validateInstance(TodoList, this);
  validateTodoItems(todoItems);

  if (
    !eventHandler ||
    !isFunction(eventHandler.toggleTodoById) ||
    !isFunction(eventHandler.deleteTodoById) ||
    !isFunction(eventHandler.editTodoById) ||
    !isFunction(eventHandler.changeTodoPriorityById)
  ) {
    throw new Error("Wrong eventHandler");
  }

  this.todoItems = todoItems;

  this.setState = (newTodoItems) => {
    validateTodoItems(newTodoItems);
    this.todoItems = newTodoItems;
    this.render();
  };

  this.bindEvents = () => {
    $target.addEventListener("change", (event) => {
      if (event.target.classList.contains("toggle")) {
        const id = event.target.closest("li").id;
        eventHandler.toggleTodoById(id);
        return;
      }

      if (event.target.classList.contains("chip")) {
        const id = event.target.closest("li").id;
        const priority = parseInt(event.target.value);
        eventHandler.changeTodoPriorityById(id, priority);
        return;
      }

      if (event.target.classList.contains("edit")) {
        const id = event.target.closest("li").id;
        const contents = event.target.value;
        if (contents === "") {
          this.stopEditing();
          return;
        }
        eventHandler.editTodoById(id, contents);
      }
    });

    $target.addEventListener("click", (event) => {
      if (event.target.classList.contains("destroy")) {
        const id = event.target.closest("li").id;
        eventHandler.deleteTodoById(id);
      }
    });

    $target.addEventListener("keydown", (event) => {
      if (event.key === ESC_KEY) {
        this.stopEditing();
      }
    });

    $target.addEventListener("dblclick", (event) => {
      const itemElem = event.target.closest("li");
      if (!itemElem) {
        return;
      }
      this.stopEditing();
      itemElem.classList.add("editing");
      const textContent = itemElem.querySelector(".label__contents")
        .textContent;
      const editElem = itemElem.querySelector(".edit");
      editElem.value = textContent;
      editElem.focus();
      editElem.selectionStart = editElem.selectionEnd = editElem.value.length;
    });
  };

  this.stopEditing = () => {
    const editingItems = $target.querySelectorAll(".editing");
    if (!editingItems) {
      return;
    }
    editingItems.forEach((itemElem) => {
      const prevContent = itemElem.querySelector(".label__contents")
        .textContent;
      const editElem = itemElem.querySelector(".edit");
      editElem.value = prevContent;
      itemElem.classList.remove("editing");
    });
  };

  const getPriorityHTML = (priority) => `
              <select class="chip select 
              ${priority === 1 ? "primary" : ""} 
              ${priority === 2 ? "secondary" : ""}">	
                <option value="0" 
                  ${priority !== 1 && priority !== 2 ? "selected" : ""}>
                  순위</option>	
                <option value="1" 
                  ${priority === 1 ? "selected" : ""}>1순위</option>	
                <option value="2" 
                  ${priority === 2 ? "selected" : ""}>2순위</option>	
              </select>`;

  this.render = () => {
    const todoItemsHTML = this.todoItems
      .map(
        ({ contents, isCompleted, _id, priority }) => `
            <li id="${_id}" class="${isCompleted ? "completed" : ""}"> 
              <div class="view">
                <input class="toggle" type="checkbox" 
                  ${isCompleted ? "checked" : ""}/>
                <label class="label">
                  ${getPriorityHTML(priority)}
                  <span class="label__contents">${contents}</span>
                </label> 
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${contents}" />
            </li>`
      )
      .join(" ");

    $target.innerHTML = `
        <ul class="todo-list">
            ${todoItemsHTML}
        </ul>
    `;
  };

  this.render();
  this.bindEvents();
}

export default TodoList;
