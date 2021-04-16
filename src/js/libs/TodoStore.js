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

  setTodoList(userId, todoList) {
    this.currentUserId = userId;
    this.originTodoList = todoList;
    this.setStatus(this.status);
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
        return this.setRenderList(
          this.originTodoList.filter((data) => !data.isCompleted),
        );
      case STATUS.COMPLETED:
        return this.setRenderList(
          this.originTodoList.filter((data) => data.isCompleted),
        );
      default:
        return this.setRenderList(this.originTodoList);
    }
  }
}

export default TodoStore;
