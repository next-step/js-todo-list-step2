import { $store } from "/js/Store/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";
import { todoItemController } from "/js/controller/TodoItemController.js";
import { todoWriterController } from "/js/controller/TodoWriterController.js";
import { todoFilterController } from "/js/controller/TodoFilterController.js";
import { todoUserController } from "/js/controller/TodoUserController.js";

function TodoApp() {
  this.todoWriterController = todoWriterController;
  this.todoItemController = todoItemController;
  this.todoFilterController = todoFilterController;
  this.todoUserController = todoUserController;
  this.view = todoView;

  this.init = function () {
    $store.init();
    this.view.render($store.getItemsByFilter());
    this.todoWriterController.init();
    this.todoItemController.init();
    this.todoFilterController.init();
    this.todoUserController.init();
  };
}

const todoApp = new TodoApp();
todoApp.init();
