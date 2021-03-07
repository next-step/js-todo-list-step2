import { todoView } from "/js/view/TodoView.js";
import { todoItemController } from "/js/controller/TodoItemController.js";
import { todoWriterController } from "/js/controller/TodoWriterController.js";
import { todoFilterController } from "/js/controller/TodoFilterController.js";
import { todoMemberController } from "/js/controller/TodoMemberController.js";
import { $store } from "/js/store/index.js";

function TodoApp() {
  this.todoWriterController = todoWriterController;
  this.todoItemController = todoItemController;
  this.todoFilterController = todoFilterController;
  this.todoMemberController = todoMemberController;
  this.view = todoView;

  this.init = async function () {
    await $store.member.init();
    await $store.todoItem.init();
    this.view.render();
    this.todoWriterController.init();
    this.todoItemController.init();
    this.todoFilterController.init();
    this.todoMemberController.init();
  };
}

const todoApp = new TodoApp();
todoApp.init();