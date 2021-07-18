import Subject from "./Subject.js";

export default class TodoStore extends Subject {
  constructor(todoList) {
    super();
    this.todoList = todoList ?? [];
  }

  /**
   * @param {Object[]} newTodoList
   */
  setTodoList(newTodoList) {
    this.todoList = newTodoList;
  }

  get todoListLength() {
    return this.todoList.length;
  }
}
