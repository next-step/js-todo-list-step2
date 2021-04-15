import Subject from './Subject.js';
import { STATUS } from '../utils/constant.js';

// Todo 앱 전반 State 관리
class TodoStore extends Subject {
  constructor(userList) {
    super();
    this.userList = userList;
    this.currentUserName = userList[1].name;
    this.currentUserId = userList[1]._id;
    this.originTodoList = userList[1].todoList;
    this.renderTodoList = userList[1].todoList;
    this.status = STATUS.ALL;
  }

  setCurrentUser(userId) {
    const { name: userName, todoList: newTodoList } = this.userList.find(
      (user) => user._id === userId,
    );
    this.originTodoList = newTodoList;
    this.renderTodoList = newTodoList;
    this.currentUserId = userId;
    this.currentUserName = userName;
    this.notifyAll();
  }

  /**
   * @param {object[]} todoList
   */
  setRenderData(todoList) {
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
