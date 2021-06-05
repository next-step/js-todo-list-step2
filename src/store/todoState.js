class TodoState {
  constructor() {
    this._todoList = [];
    this.observers = [];
  }

  get() {
    return this._todoList;
  }

  set(updateTodoList) {
    this._todoList = updateTodoList;
    this.publish();
  }

  subscribe(observer) {
    this.observers = this.observers.concat(observer);
  }

  publish() {
    this.observers.forEach((cb) => cb());
  }
}

export default new TodoState();
