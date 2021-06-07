import { $ } from "../lib/util.js";

class TodoCount {
  setState = (updatedTodoItems) => {
    this.render(updatedTodoItems);
  };
  render = (todoItems) => {
    $(".todo-count").querySelector("strong").innerHTML = todoItems.length;
  };
}

export default TodoCount;
