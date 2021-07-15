import Subject from "./Subject.js";

export default class TodoStore extends Subject {
  constructor(todoList) {
    super();
    this.todoList = todoList ?? [];
    console.log(todoList);
  }
}
