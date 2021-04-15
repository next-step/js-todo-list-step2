import Subject from './Subject.js';
import { STATUS } from '../utils/constant.js';

// Todo 앱 전반 State 관리
class TodoStore extends Subject {
  constructor(userList) {
    super();
    this.userList = userList;
    this.originData = userList[0];
    this.renderData = userList[0];
    this.status = STATUS.ALL;
  }

  /**
   * @param {object[]} todoData
   */
  setOriginData(todoData) {
    this.originData = todoData;
  }
  /**
   * @param {object[]} renderData
   */
  setRenderData(renderData) {
    this.renderData = renderData;
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
          this.originData.filter((data) => !data.complete),
        );
      case STATUS.COMPLETED:
        return this.setRenderData(
          this.originData.filter((data) => data.complete),
        );
      default:
        return this.setRenderData(this.originData);
    }
  }
}

export default TodoStore;
