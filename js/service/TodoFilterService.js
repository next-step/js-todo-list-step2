import { todoView } from "/js/view/TodoView.js";
import { $store } from "/js/store/index.js";

function TodoFilterService() {
  this.todoView = todoView;

  this.onClickFilter = function (filterState) {
    $store.todoItem.setFilterState(filterState);
    this.todoView.itemRender($store.todoItem.getItemsByFilter());
  };
}

export const todoFilterService = new TodoFilterService();
