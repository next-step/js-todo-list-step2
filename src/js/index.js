import Store from "@js/lib/store";
import TodoApp from "@js/components/TodoApp";
import { TODO_STORE } from "@js/constants/model";

(function () {
  const todoStore = new Store(TODO_STORE);
  new TodoApp(todoStore);
})();
