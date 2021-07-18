import { FILTER_TYPES } from "../utils/constants.js";
import Subject from "./Subject.js";

export default class TodoStore extends Subject {
  constructor(todoList) {
    super();
    this.todoList = todoList ?? [];
    this.todoStatus = "all";
  }

  /**
   * @param {Object[]} newTodoList
   */
  setTodoList(newTodoList) {
    this.todoList = newTodoList;
  }

  addTodo(todo) {
    this.todoList = [...this.todoList, todo];
  }

  /**
   * @param {string} status
   */
  setTodoStatus(status) {
    this.todoStatus = status;
  }

  get todoListLength() {
    return this.todoList.length;
  }

  get filteredTodoList() {
    switch (this.todoStatus) {
      case FILTER_TYPES.ACTIVE:
        return this.todoList.filter(({ isCompleted }) => !isCompleted);
      case FILTER_TYPES.COMPLETED:
        return this.todoList.filter(({ isCompleted }) => isCompleted);
      default:
        return this.todoList;
    }
  }
}
