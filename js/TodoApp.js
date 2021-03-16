import { todoView } from "/js/view/TodoView.js";
import { TodoItemController } from "/js/controller/TodoItemController.js";
import { TodoWriterController } from "/js/controller/TodoWriterController.js";
import { TodoFilterController } from "/js/controller/TodoFilterController.js";
import { TodoMemberController } from "/js/controller/TodoMemberController.js";
import { $store } from "/js/store/index.js";

function TodoApp() {
  this.view = todoView;
  this.todoFilterController = new TodoFilterController();
  this.todoItemController = new TodoItemController();
  this.todoMemberController = new TodoMemberController();
  this.todoWriterController = new TodoWriterController();

  this.init = async function () {
    await $store.member.init();
    await $store.todoItem.init();
    this.view.render();
    addEvent();
  };

  const addEvent = () => {
    this.todoWriterController.init();
    this.todoItemController.init();
    this.todoFilterController.init();
    this.todoMemberController.init();
  };
}

const todoApp = new TodoApp();
todoApp.init();
