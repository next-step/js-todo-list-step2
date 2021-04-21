import { $  } from "../../util/domSelection.js";
export class TodoInput {
  constructor(todoApp) {
    this.todoApp = todoApp;
    const newTodoInput = $("input.new-todo");
    newTodoInput.addEventListener("keydown",async (e) => {
        if (e.key == "Enter") {
        await todoApp.addItem(newTodoInput.value);
        newTodoInput.value = "";
        }
    });
  }
}
