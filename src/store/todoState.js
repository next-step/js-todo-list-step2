class TodoState {
  constructor() {
    this._todoList = [];
  }

  get() {
    return this._todoList;
  }

  set(updateTodoList) {
    this._todoList = updateTodoList;
    console.log('updated', this._todoList);
  }
}

export default new TodoState();
