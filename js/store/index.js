import { Member } from "/js/store/modules/member.js";
import { TodoItem } from "/js/store/modules/todoItem.js";

class Store {
  constructor() {
    this.member = new Member();
    this.todoItem = new TodoItem();
  }
}

export const $store = new Store();
