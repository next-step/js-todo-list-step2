import { $todoItemStore } from "/js/store/TodoStore.js";
import { todoView } from "/js/view/TodoView.js";
import { todoItemController } from "/js/controller/TodoItemController.js";
import { todoWriterController } from "/js/controller/TodoWriterController.js";
import { todoFilterController } from "/js/controller/TodoFilterController.js";
import { todoUserController } from "/js/controller/TodoUserController.js";
import { $userStore } from "./store/UserStore.js";

function TodoApp() {
  this.todoWriterController = todoWriterController;
  this.todoItemController = todoItemController;
  this.todoFilterController = todoFilterController;
  this.todoUserController = todoUserController;
  this.view = todoView;

  this.init = async function () {
    $todoItemStore.init();
    await $userStore.init();
    this.view.render();
    this.todoWriterController.init();
    this.todoItemController.init();
    this.todoFilterController.init();
    this.todoUserController.init();
  };
}

const todoApp = new TodoApp();
todoApp.init();
