import Subject from "../js/core/Subject.js";

export default class TodoState extends Subject {
  constructor() {
    super();
    this.todoList = [];
  }

  get() {
    return this.todoList;
  }

  set(updateTodoList) {
    console.log(updateTodoList)
    this.todoList = updateTodoList;
    this.publish();
  }
}
