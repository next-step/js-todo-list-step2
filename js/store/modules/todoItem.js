import { FILTER_STATE } from "/js/utils/constants.js";
import { $localStorage } from "/js/store/CustomLocalStorage.js";
import { memberApi } from "/js/api/modules/member.js";
import { $store } from "/js/store/index.js";

export function TodoItem() {
  //item = {id, title, isDone}
  this.items = [];
  this.filterState = FILTER_STATE.ALL;

  this.push = function (item) {
    this.items.push(item);
    $localStorage.saveItems(this.items);
  };

  this.toggle = function (id) {
    const item = this.items.find((item) => equalTo(item.id, id));
    item.isDone = !item.isDone;
    $localStorage.saveItems(this.items);
  };

  this.destroy = function (id) {
    this.items = this.items.filter((item) => notEqualTo(item.id, id));
    $localStorage.saveItems(this.items);
  };

  this.edit = function (id, title) {
    const item = this.items.find((item) => equalTo(item.id, id));
    item.title = title;
    $localStorage.saveItems(this.items);
  };

  this.setFilterState = function (filterState) {
    this.filterState = filterState;
    $localStorage.saveFilterState(this.filterState);
  };

  this.getItemsByFilter = function () {
    if (this.filterState === FILTER_STATE.ALL) {
      return this.items;
    }

    if (this.filterState === FILTER_STATE.ACTIVE) {
      return this.items.filter((item) => !item.isDone);
    }

    if (this.filterState === FILTER_STATE.COMPLETED) {
      return this.items.filter((item) => item.isDone);
    }
  };

  this.setItems = (items) => {
    this.items = items;
  };

  this.getItems = () => {
    return this.items;
  };

  function equalTo(itemId, id) {
    return parseInt(itemId) === parseInt(id);
  }

  function notEqualTo(itemId, id) {
    return parseInt(itemId) !== parseInt(id);
  }

  this.init = async () => {
    const nowMember = $store.member.getNowMember();
    const todoItems = await memberApi.findTodoItemById(nowMember._id);
    this.setItems(todoItems);
  };
}
