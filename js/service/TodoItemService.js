import { todoView } from "/js/view/TodoView.js";
import { $store } from "/js/store/index.js";

function TodoItemService() {
  this.todoView = todoView;

  this.toggle = function (item) {
    $store.todoItem.toggle(item.dataset.id);
    item.classList.toggle("completed");
  };

  this.destroy = function (item) {
    if (confirm("삭제하시겠습니까?")) {
      $store.todoItem.destroy(item.dataset.id);
      this.todoView.itemRender($store.todoItem.items);
    }
  };

  this.onEdit = function (item) {
    item.classList.add("editing");
  };

  this.edit = function (id, title) {
    $store.todoItem.edit(id, title);
    this.todoView.itemRender($store.todoItem.items);
  };
}

export const todoItemService = new TodoItemService();
