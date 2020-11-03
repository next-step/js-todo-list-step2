import { todoDOM } from "../utils/templates.js";
import { checkTarget } from "../utils/validator.js";

function TodoList({ $target, store }) {
  this.init = () => {
    checkTarget($target);

    store.subscribe(this.render);
  };

  const createTodoListDOM = (todos) => {
    return todos.reduce((html, todo) => {
      html += todoDOM(todo);
      return html;
    }, "");
  };

  this.render = (state) => {
    $target.innerHTML = createTodoListDOM(state.user.todoList);
  };

  this.init();
}

export default TodoList;
