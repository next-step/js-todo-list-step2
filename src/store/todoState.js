import Subject from '../core/Subject.js';

class TodoState extends Subject {
  constructor() {
    super();
    this._todoList = [];
  }

  get() {
    return this._todoList;
  }

  set(updateTodoList) {
    this._todoList = updateTodoList;
    this.publish();
  }
}

export default new TodoState();
