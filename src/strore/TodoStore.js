'use strict';

import FILTER_TYPE from '../constant/todo.js';

class TodoStore {
  constructor() {
    this.todoItems = [];
    this.filter = FILTER_TYPE.ALL;
  }

  push(item) {
    this.todoItems.push(item);
  }

  get() {}

  update() {}

  delete() {}
}

export default TodoStore;
