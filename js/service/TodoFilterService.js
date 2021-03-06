import { $todoItemStore } from "/js/store/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";

function TodoFilterService() {
  this.todoView = todoView;

  this.onClickFilter = function (filterState) {
    $todoItemStore.setFilterState(filterState);
    this.todoView.itemRender($todoItemStore.getItemsByFilter());
  };
}

export const todoFilterService = new TodoFilterService();
