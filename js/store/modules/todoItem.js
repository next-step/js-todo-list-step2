import { FILTER_STATE } from "/js/utils/constants.js";
import { memberApi } from "/js/api/modules/member.js";
import { $store } from "/js/store/index.js";
import { equalToById, notEqualToById } from "/js/utils/util.js";

export function TodoItem() {
  //item = {id, contents, isCompleted, priority}
  this.items = [];
  this.filterState = FILTER_STATE.ALL;

  this.push = function (item) {
    this.items.push(item);
  };

  this.toggle = function (id) {
    const item = this.items.find((item) => equalToById(item._id, id));
    item.isCompleted = !item.isCompleted;
  };

  this.destroy = function (id) {
    this.items = this.items.filter((item) => notEqualToById(item._id, id));
  };

  this.edit = function (id, updatedItem) {
    const item = this.items.find((item) => equalToById(item._id, id));
    item.contents = updatedItem.contents;
    item.isCompleted = updatedItem.isCompleted;
    item.priority = updatedItem.priority;
  };

  this.setFilterState = (filterState) => {
    this.filterState = filterState;
  };

  this.getItemsByFilter = function () {
    if (this.filterState === FILTER_STATE.ALL) {
      return this.items;
    }

    if (this.filterState === FILTER_STATE.ACTIVE) {
      return this.items.filter((item) => !item.isCompleted);
    }

    if (this.filterState === FILTER_STATE.COMPLETED) {
      return this.items.filter((item) => item.isCompleted);
    }
  };

  this.setItems = (items) => {
    this.items = items;
  };

  this.init = async () => {
    const nowMember = $store.member.getNowMember();
    const todoItems = await memberApi.findTodoItemById(nowMember._id);
    this.setItems(todoItems);
  };
}
