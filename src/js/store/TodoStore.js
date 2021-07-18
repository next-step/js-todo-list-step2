import { FILTER_TYPES } from "../utils/constants.js";
import Subject from "./Subject.js";

export default class TodoStore extends Subject {
  constructor(todoList) {
    super();
    this.todoList = todoList ?? [];
    this.todoStatus = FILTER_TYPES.ALL;
  }

  /**
   * @param {Object[]} newTodoList
   */
  setTodoList(newTodoList) {
    this.todoList = newTodoList;
  }

  /**
   * @param {Object} todo
   */
  addTodo(todo) {
    this.todoList = [...this.todoList, todo];
  }

  /**
   * @param {string} status
   */
  setTodoStatus(status) {
    this.todoStatus = status;
  }

  clearTodo() {
    this.todoList = [];
    this.todoStatus = FILTER_TYPES.ALL;
  }

  editTodoList(todoId, newTodo) {
    const newTodoList = this.todoList.map((todo) => {
      if (todo._id === todoId) {
        return newTodo;
      }
      return todo;
    });
    this.todoList = newTodoList;
  }

  get todoListLength() {
    return this.filteredTodoList.length;
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
