import TodoList from "./todoList.js";

export default class TodoListContainer {
  constructor() {
    // $(".new-todo").
  }
  todoList = new TodoList();

  render = (todoList) => {
    this.todoList.render(todoList);
  };
}
