import {
  isFunction,
  validateTodoItems,
  validateInstance,
  isEmptyString,
} from "../utils.js";
import { ESC_KEY, ENTER_KEY } from "../constants.js";

function TodoList($target, todoItems, eventHandler) {
  validateInstance(TodoList, this);
  validateTodoItems(todoItems);

  if (
    !isFunction(eventHandler?.toggleTodoById) ||
    !isFunction(eventHandler?.deleteTodoById) ||
    !isFunction(eventHandler?.editTodoContentsById) ||
    !isFunction(eventHandler?.changeTodoPriorityById)
  ) {
    throw new Error("Wrong eventHandler");
  }

  this.todoItems = todoItems;

  this.setState = (newTodoItems) => {
    validateTodoItems(newTodoItems);
    this.todoItems = newTodoItems;
    this.render();
  };

  this.initEventListenerss = () => {
    const onChangeHandler = (event) => {
      if (event.target.classList.contains("toggle")) {
        const id = event.target.closest("li").id;
        eventHandler.toggleTodoById(id);
        return;
      }

      if (event.target.classList.contains("chip")) {
        const id = event.target.closest("li").id;
        const priority = event.target.value;
        eventHandler.changeTodoPriorityById(id, priority);
        return;
      }
    };

    const onFocusoutHandler = (event) => {
      if (!event.target.classList.contains("edit")) {
        return;
      }

      const $itemElem = event.target.closest("li");
      $itemElem.classList.remove("editing");
    };

    const onClickHandler = (event) => {
      if (event.target.classList.contains("destroy")) {
        const id = event.target.closest("li").id;
        eventHandler.deleteTodoById(id);
      }
    };

    const onKeydownHandler = (event) => {
      if (!event.target.classList.contains("edit")) {
        return;
      }

      const $itemElem = event.target.closest("li");

      if (event.key === ESC_KEY) {
        $itemElem.classList.remove("editing");
      }

      if (event.key === ENTER_KEY) {
        const contents = event.target.value;
        if (isEmptyString(contents)) {
          console.log("Empty contents");
          return;
        }
        eventHandler.editTodoContentsById($itemElem.id, contents);
      }
    };

    const onDbclickHandler = (event) => {
      const $itemElem = event.target.closest("li");
      if (!$itemElem) {
        return;
      }
      $itemElem.classList.add("editing");
      const textContent = $itemElem.querySelector(".label__contents")
        .textContent;
      const $editElem = $itemElem.querySelector(".edit");
      $editElem.value = textContent;
      $editElem.focus();
      $editElem.setSelectionRange(
        $editElem.value.length,
        $editElem.value.length
      );
    };

    $target.addEventListener("change", onChangeHandler);
    $target.addEventListener("click", onClickHandler);
    $target.addEventListener("keydown", onKeydownHandler);
    $target.addEventListener("dblclick", onDbclickHandler);
    $target.addEventListener("focusout", onFocusoutHandler);
  };

  const getPriorityHTML = (priority) => `
              <select class="chip select 
              ${priority === "1" ? "primary" : ""} 
              ${priority === "2" ? "secondary" : ""}">	
                <option value="0" 
                  ${priority !== "1" && priority !== "2" ? "selected" : ""}>
                  순위</option>	
                <option value="1" 
                  ${priority === "1" ? "selected" : ""}>1순위</option>	
                <option value="2" 
                  ${priority === "2" ? "selected" : ""}>2순위</option>	
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
  this.initEventListenerss();
}

export default TodoList;
