'use strict';

import FILTER_TYPE from '../constant/constants.js';
import LocalStorage from './localstorage.js';
class TodoStore {
  constructor() {
    this.todoItems = [];
    this.filter = FILTER_TYPE.ALL;
  }

  push(item) {
    this.todoItems.push(item);
    LocalStorage.saveItems(this.items);
  }

  get() {
    switch (this.filter) {
      case FILTER_TYPE.ALL:
        return this.todoItems;
      case FILTER_TYPE.ACTIVE:
        return this.todoItems.filter(item => item.isCompleted === false);
      case FILTER_TYPE.COMPLETED:
        return this.todoItems.filter(item => item.isCompleted === true);
    }
  }

  update(id, contents) {
    const item = this.items.find(item => item.id === id);
    item.contents = contents;
    LocalStorage.saveItems(this.items);
  }

  delete(id) {
    this.todoItems = this.todoItems.filter(item => item.id !== id);
    LocalStorage.saveItems(this.items);
  }

  toggle(id) {
    const item = this.todoItems.find(item => item.id === id);
    item.isCompleted = !item.isCompleted;
    LocalStorage.saveItems(this.items);
  }
}

export default TodoStore;
