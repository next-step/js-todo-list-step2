import Subject from './Subject.js';
import api from '../api/index.js';
import { STATUS } from '../utils/constant.js';

class TodoStore extends Subject {
  constructor(initialUserId, initialTodo) {
    super();
    this.currentUserId = initialUserId;
    this.originTodoList = initialTodo;
    this.renderTodoList = initialTodo;
    this.isLoading = false;
    this.status = STATUS.ALL;
  }

  async initTodoList(userId) {
    try {
      this.currentUserId = userId;
      this.setLoadingStatus(true);
      const { todoList } = await api.getUser(userId);
      this.originTodoList = todoList;
      this.isLoading = false;
      this.setStatus(this.status);
    } catch (error) {
      return alert(error);
    }
  }

  setLoadingStatus(status) {
    this.isLoading = status;
    this.notifyAll();
  }

  setOriginList(todoList) {
    this.originTodoList = todoList;
  }

  setRenderList(todoList) {
    this.renderTodoList = todoList;
    this.isLoading = false;
    this.notifyAll();
  }

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
