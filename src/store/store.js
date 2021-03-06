'use strict';

import { FILTER_TYPE } from '../constant/constants.js';
import { todoLocalStorage } from './localstorage.js';

class TodoListStore {
  constructor() {
    this.todoItems = [];
    this.filterType = FILTER_TYPE.ALL;
    // this.localStorage = new LocalStorage();
  }

  push(item) {
    this.todoItems.push(item);
    todoLocalStorage.saveItems(this.todoItems);
  }

  getItemsByFilter() {
    switch (this.filterType) {
      case FILTER_TYPE.ALL:
        return this.todoItems;
      case FILTER_TYPE.ACTIVE:
        return this.todoItems.filter(item => item.isCompleted === false);
      case FILTER_TYPE.COMPLETED:
        return this.todoItems.filter(item => item.isCompleted === true);
    }
  }

  update(id, contents) {
    const item = this.todoItems.find(item => item.id === id);
    item.contents = contents;
    todoLocalStorage.saveItems(this.todoItems);
  }

  delete(id) {
    console.log(id);
    this.todoItems = this.todoItems.filter(item => item.id !== id);
    todoLocalStorage.saveItems(this.todoItems);
  }

  toggle(id) {
    const item = this.todoItems.find(item => item.id === id);
    item.isCompleted = !item.isCompleted;
    todoLocalStorage.saveItems(this.todoItems);
  }

  clear() {
    this.todoItems = [];
    todoLocalStorage.saveItems(this.todoItems);
  }

  setFilterType(filterType) {
    this.filterType = filterType;
  }

  init() {
    this.todoItems = todoLocalStorage.loadItems();
  }
}

export const todoListStore = new TodoListStore();
