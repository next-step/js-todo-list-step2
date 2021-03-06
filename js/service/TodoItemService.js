import { $todoItemStore } from "/js/store/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";

function TodoItemService() {
  this.todoView = todoView;

  this.toggle = function (item) {
    $todoItemStore.toggle(item.dataset.id);
    item.classList.toggle("completed");
  };

  this.destroy = function (item) {
    if (confirm("삭제하시겠습니까?")) {
      $todoItemStore.destroy(item.dataset.id);
      this.todoView.itemRender($todoItemStore.items);
    }
  };

  this.onEdit = function (item) {
    item.classList.add("editing");
  };

  this.edit = function (id, title) {
    $todoItemStore.edit(id, title);
    this.todoView.itemRender($todoItemStore.items);
  };
}

export const todoItemService = new TodoItemService();
