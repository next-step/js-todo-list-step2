import { todoWriterService } from "/js/service/TodoWriterService.js";

export function TodoWriterController() {
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

