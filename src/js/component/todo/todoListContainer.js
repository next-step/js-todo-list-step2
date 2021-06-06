import TodoList from "./todoList.js";

export default class TodoListContainer {
  todoList = new TodoList();

  render = (userInfo) => {
    this.todoList.render(userInfo.todoList);
  };
}
