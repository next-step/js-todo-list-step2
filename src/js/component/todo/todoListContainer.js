import { $ } from "../../util/querySelector.js";
import TodoList from "./todoList.js";

export default class TodoListContainer {
  constructor({ addTodo }) {
    window.addEventListener("keydown", ({ key }) => {
      const value = $(".new-todo").value;
      if (key === "Enter" && value.length > 2) {
        addTodo(value);
        $(".new-todo").value = "";
      }
    });
  }
  todoList = new TodoList();

  render = (todoList) => {
    this.todoList.render(todoList);
  };
}
