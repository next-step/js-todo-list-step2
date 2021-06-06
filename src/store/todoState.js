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
    console.log('before', this.get());
    this._todoList = updateTodoList;
    this.publish();
    console.log('after', this.get());
  }
}

export default new TodoState();
