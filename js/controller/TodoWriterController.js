import { todoWriterService } from "/js/service/TodoWriterService.js";

function TodoWriterController() {
  this.todoWriterService = todoWriterService;

  const $newTodoContents = document.querySelector(".new-todo");

  const onKeyupTodoTitle = (event) => {
    if (event.key === "Enter") {
      this.todoWriterService.addNewItem($newTodoContents.value, $newTodoContents);
    }
  };

  this.init = function () {
    $newTodoContents.addEventListener("keyup", onKeyupTodoTitle);
  };
}

export const todoWriterController = new TodoWriterController();
