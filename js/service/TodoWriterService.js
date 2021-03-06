import { todoView } from "/js/view/TodoView.js";
import { $todoItemStore } from "/js/store/TodoStore.js";

function TodoWriterService() {
  this.todoView = todoView;

  this.addNewItem = function (item, $newTodoTitle) {
    if (isEmpty(item.title)) {
      return;
    }

    $todoItemStore.push(item);
    this.todoView.itemRender($todoItemStore.getItemsByFilter());

    clear($newTodoTitle);
  };

  function clear($newTodoTitle) {
    $newTodoTitle.value = "";
  }
}

export const todoWriterService = new TodoWriterService();
