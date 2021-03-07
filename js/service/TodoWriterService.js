import { todoView } from "/js/view/TodoView.js";
import { isEmpty } from "/js/utils/util.js";
import { $store } from "/js/store/index.js";

function TodoWriterService() {
  this.todoView = todoView;

  this.addNewItem = function (item, $newTodoTitle) {
    if (isEmpty(item.title)) {
      return;
    }

    $store.todoItem.push(item);
    this.todoView.itemRender($store.todoItem.getItemsByFilter());

    clear($newTodoTitle);
  };

  function clear($newTodoTitle) {
    $newTodoTitle.value = "";
  }
}

export const todoWriterService = new TodoWriterService();
