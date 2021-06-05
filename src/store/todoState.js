class TodoState {
  constructor() {
    this._todoList = [];
  }

  get() {
    return this._todoList;
  }

  set(updateTodoList) {
    this._todoList = updateTodoList;
  }
}

export default new TodoState();
