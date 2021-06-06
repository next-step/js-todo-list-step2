import TodoList from "./todoList.js";

export default class TodoListContainer {
  constructor() {}

  todoList = new TodoList();

  render = (userInfo) => {
    this.todoList.render(userInfo.todoList);
  };
}
