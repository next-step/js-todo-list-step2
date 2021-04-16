import Subject from './Subject.js';
import { STATUS } from '../utils/constant.js';

class TodoStore extends Subject {
  constructor(initialUserId, initialTodo) {
    super();
    this.currentUserId = initialUserId;
    this.originTodoList = initialTodo;
    this.renderTodoList = initialTodo;
    this.status = STATUS.ALL;
  }

  setTodoList(todoList) {
    this.originTodoList = todoList;
    this.setRenderList(todoList);
  }

  setOriginList(todoList) {
    this.originTodoList = todoList;
  }
  /**
   * @param {object[]} todoList
   */
  setRenderList(todoList) {
    this.renderTodoList = todoList;
    this.notifyAll();
  }

  /**
   * @param {string} status
   */
  setStatus(status) {
    this.status = status;
    switch (status) {
      case STATUS.ACTIVE:
        return this.setRenderData(
          this.originTodoList.filter((data) => !data.complete),
        );
      case STATUS.COMPLETED:
        return this.setRenderData(
          this.originTodoList.filter((data) => data.complete),
        );
      default:
        return this.setRenderData(this.originTodoList);
    }
  }
}

export default TodoStore;
