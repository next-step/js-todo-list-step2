import Store from "@js/lib/store";
import TodoApp from "@js/components/TodoApp";

(function () {
  const store = new Store();
  new TodoApp(store);
})();
